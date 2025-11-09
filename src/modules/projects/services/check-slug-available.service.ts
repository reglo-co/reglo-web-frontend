import { Result } from '@core/entities'
import { executeService } from '@core/lib/service-helpers'
import { api } from '@lib/api'

const SERVICE_NAME = 'checkProjectSlugAvailableService'

type AvailabilityResponse = {
  isAvailable: boolean
}

export async function checkProjectSlugAvailableService(
  organizationSlug: string,
  slug: string
): Promise<Result<boolean>> {
  return executeService(
    SERVICE_NAME,
    async () => {
      const response = await api.get<AvailabilityResponse>(
        `projects/slug/available/${organizationSlug}/${slug}`
      )
      return response.isAvailable
    },
    { fallback: false }
  )
}
