import { Result } from '@/modules/common/entities'
import { api } from '@/modules/common/lib/api'

export async function checkSlugAvailableService(
  slug: string
): Promise<Result<boolean>> {
  try {
    const response = await api.get<boolean>(
      `organizations/slug/available/${slug}`
    )

    return Result.success(response)
  } catch (error) {
    const errorMessage = `[checkSlugAvailableService] ${
      error instanceof Error ? error.message : 'Unknown error occurred'
    }`
    return Result.failure(new Error(errorMessage))
  }
}
