import { Result } from '@core/entities'
import { executeService } from '@core/lib/service-helpers'
import { api } from '@lib/api'
import { Organization } from '@organizations/types'

const SERVICE_NAME = 'listMyAvailablesOrganizationsService'

type ListOrganizationsResponse = {
  list: Organization[]
  total: number
}

export async function listMyAvailablesOrganizationsService(): Promise<
  Result<ListOrganizationsResponse>
> {
  return executeService(
    SERVICE_NAME,
    () => api.get<ListOrganizationsResponse>('me/organizations/availables'),
    { fallback: { list: [], total: 0 } }
  )
}
