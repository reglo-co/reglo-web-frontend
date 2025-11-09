import { Result } from '@core/entities'
import { api } from '@lib/api'
import type { Project } from '@projects/types'
import { executeService } from '@core/lib/service-helpers'

const SERVICE_NAME = 'createProjectService'
const API_ENDPOINT = 'projects/create'

type CreateProjectPayload = Pick<Project, 'name' | 'slug' | 'organizationSlug'>

export async function createProjectService(
  projectData: CreateProjectPayload
): Promise<Result<Project>> {
  return executeService(
    SERVICE_NAME,
    () => api.post<Project>(API_ENDPOINT, projectData)
  )
}
