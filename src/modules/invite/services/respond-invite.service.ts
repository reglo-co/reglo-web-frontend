import { Result } from '@core/entities'
import { executeService } from '@core/lib/service-helpers'
import { api } from '@lib/api'

const ACCEPT_SERVICE_NAME = 'acceptInviteService'
const REJECT_SERVICE_NAME = 'rejectInviteService'

export async function acceptInviteService(
  inviteId: string
): Promise<Result<boolean>> {
  return executeService(
    ACCEPT_SERVICE_NAME,
    () => api.post<boolean>(`me/invites/${inviteId}/accept`),
    { fallback: false }
  )
}

export async function rejectInviteService(
  inviteId: string
): Promise<Result<boolean>> {
  return executeService(
    REJECT_SERVICE_NAME,
    () => api.post<boolean>(`me/invites/${inviteId}/reject`),
    { fallback: false }
  )
}
