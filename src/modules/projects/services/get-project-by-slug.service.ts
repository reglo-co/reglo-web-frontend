import { Result } from '@core/entities'
import { api } from '@lib/api'
import { Project } from '@projects/types'

export async function getProjectBySlugService(
  organizationSlug: string,
  projectSlug: string
): Promise<Result<Project | null>> {
  try {
    const response = await api.get<Project | null>(
      `projects/${organizationSlug}/${projectSlug}`
    )

    return Result.success(response)
  } catch (error) {
    const errorMessage = `[getProjectBySlugService] ${
      error instanceof Error ? error.message : 'Unknown error occurred'
    }`
    return Result.failure(new Error(errorMessage))
  }
}

