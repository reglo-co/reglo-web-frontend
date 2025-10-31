import { Result } from '@/modules/common/helpers'
import { api } from '@/modules/common/helpers/api'

export async function getOrganizationsSlugAvailable(
  slug: string
): Promise<Result<{ available: boolean }, Error>> {
  try {
    const data = await api.get<{ available: boolean }>(
      `/organizations/slug/available/${slug}`
    )
    return Result.success(data)
  } catch (error) {
    return Result.failure(
      error instanceof Error ? error : new Error('Unknown error occurred')
    )
  }
}
