import { Result } from '@/modules/common/helpers'
import { api } from '@/modules/common/helpers/api'

export interface CreateOrganizationData {
  name: string
  slug: string
  plan: string
  collaborators: Array<{
    email: string
    role: string
  }>
}

export async function createOrganization(
  data: CreateOrganizationData
): Promise<Result<{ slug: string }, Error>> {
  try {
    const result = await api.post<{ slug: string }, CreateOrganizationData>(
      '/organizations/create',
      data
    )
    return Result.success(result)
  } catch (error) {
    return Result.failure(
      error instanceof Error ? error : new Error('Unknown error occurred')
    )
  }
}
