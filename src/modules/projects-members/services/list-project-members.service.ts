import { api } from '@lib/api'
import { ProjectMembersResponse } from '@projects-members/types/project-member.type'

export async function listProjectMembersService(
  organizationSlug: string,
  projectSlug: string
): Promise<ProjectMembersResponse> {
  try {
    const response = await api.get<ProjectMembersResponse>(
      `projects/members/${organizationSlug}/${projectSlug}`
    )
    return response
  } catch {
    return {
      list: [],
      total: 0,
    }
  }
}
