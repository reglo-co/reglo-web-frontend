import { api } from '@lib/api'

type AvailabilityResponse = {
  isAvailable: boolean
}

export async function checkProjectSlugAvailableService(
  organizationSlug: string,
  slug: string
): Promise<boolean> {
  try {
    const response = await api.get<AvailabilityResponse>(
      `projects/slug/available/${organizationSlug}/${slug}`
    )

    return response.isAvailable
  } catch (error) {
    const errorMessage = `[checkProjectSlugAvailableService] ${
      error instanceof Error ? error.message : 'Unknown error occurred'
    }`
    console.error(errorMessage)
    return false
  }
}
