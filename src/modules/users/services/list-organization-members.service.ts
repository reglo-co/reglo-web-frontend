import { Result } from '@core/entities'
import { executeService } from '@core/lib/service-helpers'
import { api } from '@lib/api'
import { OrganizationMembersResponse } from '@users/types'

const SERVICE_NAME = 'listOrganizationMembersService'

export async function listOrganizationMembersService(
  organizationSlug: string
): Promise<Result<OrganizationMembersResponse>> {
  return executeService(
    SERVICE_NAME,
    () =>
      api.get<OrganizationMembersResponse>(
        `me/organizations/members/${organizationSlug}`
      ),
    { fallback: { list: [], total: 0 } }
  )
}
