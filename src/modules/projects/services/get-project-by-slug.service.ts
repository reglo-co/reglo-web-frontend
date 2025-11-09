import { Result } from '@core/entities'
import { executeService } from '@core/lib/service-helpers'
import { api } from '@lib/api'
import { Project } from '@projects/types'

const SERVICE_NAME = 'getProjectBySlugService'

export async function getProjectBySlugService(
  organizationSlug: string,
  projectSlug: string
): Promise<Result<Project | null>> {
  return executeService(
    SERVICE_NAME,
    () =>
      api.get<Project | null>(`projects/${organizationSlug}/${projectSlug}`),
    { fallback: null }
  )
}
