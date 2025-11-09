import { api } from '@lib/api'

export async function cancelInviteService(
  organizationSlug: string,
  inviteId: string
) {
  return api.post<boolean>(`me/organizations/invites/${organizationSlug}/cancel`, {
    inviteId,
  })
}


