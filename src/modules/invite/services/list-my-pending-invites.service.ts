import { Result } from '@core/entities'
import { executeService } from '@core/lib/service-helpers'
import { Invite } from '@invite/types'
import { api } from '@lib/api'

const SERVICE_NAME = 'listMyPendingInvitesService'

type ListMyPendingInvitesResponse = {
  list: Invite[]
  total: number
}

export async function listMyPendingInvitesService(): Promise<
  Result<ListMyPendingInvitesResponse>
> {
  return executeService(
    SERVICE_NAME,
    () => api.get<ListMyPendingInvitesResponse>('me/invites/pending'),
    { fallback: { list: [], total: 0 } }
  )
}
