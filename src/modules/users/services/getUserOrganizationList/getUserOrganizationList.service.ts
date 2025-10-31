import { Result } from '@common/helpers/result.types'
import { CreateOrganizationData } from '@organizations/services'
import { api } from '@/modules/common/helpers/api'

export type Organization = CreateOrganizationData & {
  id: string
}

export async function getUserOrganizationList(): Promise<
  Result<Organization[], Error>
> {
  try {
    const data = await api.get<Organization[]>(
      '/users/organizations/list'
    )

    if (!Array.isArray(data)) {
      return Result.failure(
        new Error('Invalid response format: expected array')
      )
    }

    return Result.success(data)
  } catch (error) {
    return Result.failure(
      error instanceof Error ? error : new Error('Unknown error occurred')
    )
  }
}
