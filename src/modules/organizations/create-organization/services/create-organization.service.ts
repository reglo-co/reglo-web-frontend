import { Result } from '@/modules/common/entities'
import { api } from '@/modules/common/lib/api'
import type { Organization } from '@/modules/organizations/types'

export async function createOrganizationService(
  organization: Pick<Organization, 'name' | 'slug'>
): Promise<Result<Organization>> {
  try {
    const response = await api.post<Organization>(
      'organizations/create',
      organization
    )
    return Result.success(response)
  } catch (error) {
    const errorMessage = `[createOrganizationService] ${
      error instanceof Error ? error.message : 'Unknown error occurred'
    }`
    return Result.failure(new Error(errorMessage))
  }
}
