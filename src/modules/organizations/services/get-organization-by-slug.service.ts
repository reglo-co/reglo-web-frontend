import { Result } from '@core/entities'
import { api } from '@lib/api'
import { Organization } from '@organizations/types'
import { executeService } from '@core/lib/service-helpers'

const SERVICE_NAME = 'getOrganizationBySlugService'

export async function getOrganizationBySlugService(
  slug: string
): Promise<Result<Organization>> {
  return executeService(
    SERVICE_NAME,
    () => api.get<Organization>(`organizations/${slug}`)
  )
}
