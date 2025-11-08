import { ApiResponse } from '@core/entities'
import { auth0 } from '@lib/auth0'

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

type UsersByEmailResponse = {
  users: Array<{
    email: string
    name: string
    avatarUrl?: string
  }>
}

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

async function getManagementToken(): Promise<string> {
  const domain = process.env.AUTH0_DOMAIN
  const clientId = process.env.AUTH0_API_CLIENT_ID
  const clientSecret = process.env.AUTH0_API_CLIENT_SECRET

  if (!domain || !clientId || !clientSecret) {
    throw new Error('Missing Auth0 management credentials')
  }

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
    throw new Error(`[Auth0] token error: ${response.status} ${text}`)
  }

  const json = (await response.json()) as Auth0ManagementTokenResponse
  return json.access_token
}

async function fetchUserByEmail(token: string, email: string) {
  const audience = process.env.AUTH0_API_AUDIENCE
  if (!audience) throw new Error('Missing AUTH0_DOMAIN')

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
    throw new Error(`[Auth0] users-by-email error: ${response.status} ${text}`)
  }

  const data = (await response.json()) as Auth0ApiUser[]
  const user = data[0]
  if (!user) return null

  return {
    id: user.user_id,
    email: user.email,
    name: user.name || user.email,
    avatarUrl: user.picture,
  }
}

const handler = auth0.withApiAuthRequired(async function handler(
  request: Request
) {
  const url = new URL(request.url)
  const single = url.searchParams.get('email')
  const many = url.searchParams.get('emails')

  const emails = ((): string[] => {
    if (single) return [single]
    if (many) {
      return many
        .split(',')
        .map((e) => e.trim())
        .filter(Boolean)
    }
    return []
  })()

  if (!emails.length) {
    return ApiResponse.badRequest('Missing email or emails query param')
  }

  try {
    const token = await getManagementToken()
    const results = await Promise.all(
      Array.from(new Set(emails)).map((email) =>
        fetchUserByEmail(token, email).catch(() => null)
      )
    )
    const users = results
      .filter((u): u is NonNullable<typeof u> => Boolean(u))
      .map(({ email, name, avatarUrl }) => ({
        email,
        name,
        avatarUrl,
      }))
    return ApiResponse.ok<UsersByEmailResponse>({ users })
  } catch (error) {
    console.error('[GET /users/by-email] error', error)
    if (error instanceof Error) {
      return ApiResponse.internalServerError(
        `[GET /users/by-email] ${error.message}`
      )
    }
    return ApiResponse.internalServerError(
      `[GET /users/by-email] ${String(error)}`
    )
  }
})

export const GET = handler as (req: Request) => Promise<Response> | Response
