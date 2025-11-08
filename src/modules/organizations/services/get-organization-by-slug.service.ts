import { Result } from '@core/entities'
import { api } from '@lib/api'
import { Organization } from '@organizations/types'

export async function getOrganizationBySlugService(
  slug: string
): Promise<Result<Organization>> {
  try {
    const response = await api.get<Organization>(`organizations/${slug}`)

    return Result.success(response)
  } catch (error) {
    const errorMessage = `[getOrganizationBySlugService] ${
      error instanceof Error ? error.message : 'Unknown error occurred'
    }`
    return Result.failure(new Error(errorMessage))
  }
}
