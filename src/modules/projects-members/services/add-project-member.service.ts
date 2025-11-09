import { api } from '@lib/api'

export async function addProjectMemberService(
  organizationSlug: string,
  projectSlug: string,
  email: string
) {
  await api.post(`projects/members/${organizationSlug}/${projectSlug}`, {
    email,
  })
}


