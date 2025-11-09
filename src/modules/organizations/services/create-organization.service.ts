import { Result } from '@core/entities'
import { api } from '@lib/api'
import type { Organization } from '@organizations/types'

type CreateOrganizationPayload = Pick<Organization, 'name' | 'slug'>

const API_ENDPOINTS = {
  CREATE_ORGANIZATION: 'organizations/create',
} as const

function formatServiceError(serviceName: string, error: unknown): string {
  const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
  return `[${serviceName}] ${errorMessage}`
}

export async function createOrganizationService(
  organizationData: CreateOrganizationPayload
): Promise<Result<Organization>> {
  try {
    const createdOrganization = await api.post<Organization>(
      API_ENDPOINTS.CREATE_ORGANIZATION,
      organizationData
    )
    return Result.success(createdOrganization)
  } catch (error) {
    const errorMessage = formatServiceError('createOrganizationService', error)
    return Result.failure(new Error(errorMessage))
  }
}
