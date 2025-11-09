import { api } from '@lib/api'

export async function removeMemberService(
  organizationSlug: string,
  memberId: string
) {
  return api.post<boolean>(`me/organizations/members/${organizationSlug}/delete`, {
    memberId,
  })
}


