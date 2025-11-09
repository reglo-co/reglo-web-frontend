import { Result } from '@core/entities'
import { api } from '@lib/api'
import { UpdateRecord } from '@updates/types/update.type'

export async function listUpdatesService(
  organizationSlug: string
): Promise<Result<UpdateRecord[]>> {
  try {
    const response = await api.get<UpdateRecord[]>(
      `me/organizations/updates/${organizationSlug}`
    )
    return Result.success(response)
  } catch (error) {
    const errorMessage = `[listUpdatesService] ${
      error instanceof Error ? error.message : 'Unknown error occurred'
    }`
    return Result.failure(new Error(errorMessage))
  }
}


