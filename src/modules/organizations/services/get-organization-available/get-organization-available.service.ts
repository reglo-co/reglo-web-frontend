import { Result } from '@/modules/common/helpers'
import { api } from '@/modules/common/helpers/api'
import { OrganizationAvailable } from '@/modules/organizations/types'

export async function getOrganizationAvailable() {
  try {
    const data = await api.get<OrganizationAvailable[]>(
      '/me/organizations/availables'
    )
    return Result.success(data)
  } catch (error) {
    return Result.failure(
      error instanceof Error ? error : new Error('Unknown error occurred')
    )
  }
}
