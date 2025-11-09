import { Result } from '@core/entities'
import { executeService } from '@core/lib/service-helpers'
import { api } from '@lib/api'
import type { Organization } from '@organizations/types'

const SERVICE_NAME = 'createOrganizationService'
const API_ENDPOINT = 'organizations/create'

type CreateOrganizationPayload = Pick<Organization, 'name' | 'slug'>

export async function createOrganizationService(
  organizationData: CreateOrganizationPayload
): Promise<Result<Organization>> {
  return executeService(SERVICE_NAME, () =>
    api.post<Organization>(API_ENDPOINT, organizationData)
  )
}
