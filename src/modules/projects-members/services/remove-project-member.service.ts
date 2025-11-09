import { api } from '@lib/api'

export async function removeProjectMemberService(
  organizationSlug: string,
  projectSlug: string,
  email: string
) {
  await api.delete(
    `projects/members/${organizationSlug}/${projectSlug}?email=${encodeURIComponent(email)}`
  )
}


