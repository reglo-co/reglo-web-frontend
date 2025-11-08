import { Result } from '@core/entities'
import { api } from '@lib/api'

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
