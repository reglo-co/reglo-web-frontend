import { Result } from '@/modules/common/entities'
import { api } from '@/modules/common/lib/api'
import type { Project } from '@/modules/projects/types'

export async function createProjectService(
  project: Pick<Project, 'name' | 'slug' | 'organizationSlug'>
): Promise<Result<Project>> {
  try {
    const response = await api.post<Project>('projects/create', project)
    return Result.success(response)
  } catch (error) {
    const errorMessage = `[createProjectService] ${
      error instanceof Error ? error.message : 'Unknown error occurred'
    }`
    return Result.failure(new Error(errorMessage))
  }
}


