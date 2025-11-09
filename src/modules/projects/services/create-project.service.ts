import { Result } from '@core/entities'
import { api } from '@lib/api'
import type { Project } from '@projects/types'

type CreateProjectPayload = Pick<Project, 'name' | 'slug' | 'organizationSlug'>

const API_ENDPOINTS = {
  CREATE_PROJECT: 'projects/create',
} as const

function formatServiceError(serviceName: string, error: unknown): string {
  const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
  return `[${serviceName}] ${errorMessage}`
}

export async function createProjectService(
  projectData: CreateProjectPayload
): Promise<Result<Project>> {
  try {
    const createdProject = await api.post<Project>(
      API_ENDPOINTS.CREATE_PROJECT,
      projectData
    )
    return Result.success(createdProject)
  } catch (error) {
    const errorMessage = formatServiceError('createProjectService', error)
    return Result.failure(new Error(errorMessage))
  }
}
