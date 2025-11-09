import { Result } from '@core/entities'
import { executeService } from '@core/lib/service-helpers'
import { api } from '@lib/api'

const SERVICE_NAME = 'cancelInviteService'

export async function cancelInviteService(
  organizationSlug: string,
  inviteId: string
): Promise<Result<boolean>> {
  return executeService(
    SERVICE_NAME,
    () =>
      api.post<boolean>(`me/organizations/invites/${organizationSlug}/cancel`, {
        inviteId,
      }),
    { fallback: false }
  )
}
