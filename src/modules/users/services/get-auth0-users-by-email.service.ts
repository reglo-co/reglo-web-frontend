import { Result } from '@core/entities'
import { executeService } from '@core/lib/service-helpers'
import { api } from '@lib/api'

const SERVICE_NAME = 'getAuth0UsersByEmailService'

export type Auth0UserLite = {
  email: string
  name: string
  avatarUrl?: string
}

type GetAuth0UsersResponse = {
  users: Auth0UserLite[]
}

export async function getAuth0UsersByEmailService(
  emails: string[]
): Promise<Result<Auth0UserLite[]>> {
  if (!emails.length) {
    return Result.success([])
  }

  return executeService(
    SERVICE_NAME,
    async () => {
      const response = await api.get<GetAuth0UsersResponse>('users/by-email', {
        searchParams: {
          emails: emails.join(','),
        },
      })
      return response.users || []
    },
    { fallback: [] }
  )
}
