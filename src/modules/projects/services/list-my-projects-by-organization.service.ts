import { Result } from '@core/entities'
import { executeService } from '@core/lib/service-helpers'
import { api } from '@lib/api'
import type { ProjectTable } from '@projects/types'

const SERVICE_NAME = 'listMyProjectsByOrganizationService'

type ListMyProjectsByOrganizationResponse = {
  list: ProjectTable[]
  total: number
}

export async function listMyProjectsByOrganizationService(
  organizationSlug: string
): Promise<Result<ListMyProjectsByOrganizationResponse>> {
  return executeService(
    SERVICE_NAME,
    () =>
      api.get<ListMyProjectsByOrganizationResponse>(
        `me/projects/availables/${organizationSlug}`
      ),
    { fallback: { list: [], total: 0 } }
  )
}
