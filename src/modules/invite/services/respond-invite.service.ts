import { api } from '@lib/api'

export async function acceptInviteService(inviteId: string) {
  return api.post<boolean>(`me/invites/${inviteId}/accept`)
}

export async function rejectInviteService(inviteId: string) {
  return api.post<boolean>(`me/invites/${inviteId}/reject`)
}


