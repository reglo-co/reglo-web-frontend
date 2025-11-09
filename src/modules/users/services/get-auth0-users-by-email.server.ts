import { Result } from '@core/entities'
import { ServiceLogger, executeService } from '@core/lib/service-helpers'
import { env } from '@env'

const SERVICE_NAME = 'getAuth0UsersByEmailServer'

type Auth0ManagementTokenResponse = {
  access_token: string
  token_type: string
  expires_in: number
}

type Auth0ApiUser = {
  user_id: string
  email: string
  name?: string
  picture?: string
}

export type Auth0UserProfile = {
  id: string
  email: string
  name: string
  avatarUrl?: string
}

async function getManagementToken(): Promise<string> {
  const domain = env.AUTH0_DOMAIN
  const clientId = env.AUTH0_API_CLIENT_ID
  const clientSecret = env.AUTH0_API_CLIENT_SECRET

  const response = await fetch(`https://${domain}/oauth/token`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
      audience: `https://${domain}/api/v2/`,
    }),
    cache: 'no-store',
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`Auth0 token error: ${response.status} ${text}`)
  }

  const json = (await response.json()) as Auth0ManagementTokenResponse
  return json.access_token
}

async function fetchUserByEmail(
  token: string,
  email: string
): Promise<Auth0UserProfile | null> {
  const result = await executeService(
    `${SERVICE_NAME}.fetchUserByEmail`,
    async () => {
      const audience = env.AUTH0_API_AUDIENCE

      const url = new URL(`${audience}/users-by-email`)
      url.searchParams.set('email', email)
      url.searchParams.set('fields', 'user_id,email,name,picture')
      url.searchParams.set('include_fields', 'true')

      const response = await fetch(url, {
        headers: {
          authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
      })

      if (!response.ok) {
        const text = await response.text()
        throw new Error(
          `Auth0 users-by-email error: ${response.status} ${text}`
        )
      }

      const data = (await response.json()) as Auth0ApiUser[]
      const user = data[0]
      if (!user) return null

      const profile: Auth0UserProfile = {
        id: user.user_id,
        email: user.email,
        name: user.name || user.email,
        avatarUrl: user.picture,
      }
      return profile
    },
    { fallback: null }
  )

  return result.getDataOrDefault(null)
}

export async function getAuth0UsersByEmailServer(
  emails: string[]
): Promise<Result<Auth0UserProfile[]>> {
  if (!emails.length) {
    return Result.success([])
  }

  return executeService(
    SERVICE_NAME,
    async () => {
      const token = await getManagementToken()
      const uniqueEmails = Array.from(new Set(emails))

      const results = await Promise.all<Auth0UserProfile | null>(
        uniqueEmails.map((email) => fetchUserByEmail(token, email))
      )

      const validUsers = results.filter(
        (user): user is Auth0UserProfile => user !== null
      )

      ServiceLogger.info(
        SERVICE_NAME,
        `Fetched ${validUsers.length}/${uniqueEmails.length} users`,
        {
          requested: uniqueEmails.length,
          found: validUsers.length,
        }
      )

      return validUsers
    },
    { fallback: [] }
  )
}
