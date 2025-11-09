import { api } from '@lib/api'

export async function inviteMembersService(
  organizationSlug: string,
  emails: string[]
) {
  return api.post<{ created: number }>(
    `me/organizations/invites/${organizationSlug}`,
    { emails }
  )
}


