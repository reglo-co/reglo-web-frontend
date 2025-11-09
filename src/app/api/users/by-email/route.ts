import { ApiResponse } from '@core/entities'
import { auth0 } from '@lib/auth0'
import { getAuth0UsersByEmailServer } from '@users/services/get-auth0-users-by-email.server'
import { handleApiError } from '@lib/api'

type UsersByEmailResponse = {
  users: Array<{
    email: string
    name: string
    avatarUrl?: string
  }>
}

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function parseEmailsFromQuery(url: URL): string[] {
  const single = url.searchParams.get('email')
  const many = url.searchParams.get('emails')

  if (single) return [single]

  if (many) {
    return many
      .split(',')
      .map((e) => e.trim())
      .filter(Boolean)
  }

  return []
}

const handler = auth0.withApiAuthRequired(async function handler(
  request: Request
) {
  const url = new URL(request.url)
  const emails = parseEmailsFromQuery(url)

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
    return handleApiError(error, 'GET /users/by-email')
  }
})

export const GET = handler as (req: Request) => Promise<Response> | Response
