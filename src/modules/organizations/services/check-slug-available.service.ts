import { Result } from '@core/entities'
import { executeService } from '@core/lib/service-helpers'
import { api } from '@lib/api'

const SERVICE_NAME = 'checkSlugAvailableService'

export async function checkSlugAvailableService(
  slug: string
): Promise<Result<boolean>> {
  return executeService(
    SERVICE_NAME,
    () => api.get<boolean>(`organizations/slug/available/${slug}`),
    { fallback: false }
  )
}
