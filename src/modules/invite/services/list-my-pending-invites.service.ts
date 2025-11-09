import { api } from '@lib/api'
import { Invite } from '@invite/types'

export async function listMyPendingInvitesService(): Promise<{
  list: Invite[]
  total: number
}> {
  return api.get<{ list: Invite[]; total: number }>('me/invites/pending')
}


