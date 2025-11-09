import { Result } from '@core/entities'
import { executeService } from '@core/lib/service-helpers'
import { api } from '@lib/api'
import { ProjectMembersResponse } from '@projects-members/types/project-member.type'

const SERVICE_NAME = 'listProjectMembersService'

export async function listProjectMembersService(
  organizationSlug: string,
  projectSlug: string
): Promise<Result<ProjectMembersResponse>> {
  return executeService(
    SERVICE_NAME,
    () =>
      api.get<ProjectMembersResponse>(
        `projects/members/${organizationSlug}/${projectSlug}`
      ),
    { fallback: { list: [], total: 0 } }
  )
}
