import { Result } from '@core/entities'
import { executeService } from '@core/lib/service-helpers'
import { api } from '@lib/api'
import type { Organization } from '@organizations/types'

const SERVICE_NAME = 'listMyOrganizationsService'

type ListMyOrganizationsResponse = {
  list: Organization[]
  total: number
}

export async function listMyOrganizationsService(): Promise<
  Result<ListMyOrganizationsResponse>
> {
  return executeService(
    SERVICE_NAME,
    () => api.get<ListMyOrganizationsResponse>('me/organizations/created'),
    { fallback: { list: [], total: 0 } }
  )
}
