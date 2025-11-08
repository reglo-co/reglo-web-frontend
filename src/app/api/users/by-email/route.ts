import { ApiResponse } from '@core/entities'
import { auth0 } from '@lib/auth0'
import { getAuth0UsersByEmailServer } from '@users/services/get-auth0-users-by-email.server'

type UsersByEmailResponse = {
  users: Array<{
    email: string
    name: string
    avatarUrl?: string
  }>
}

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

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
    const usersResult = await getAuth0UsersByEmailServer(emails)
    const users = usersResult.map(({ email, name, avatarUrl }) => ({
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
