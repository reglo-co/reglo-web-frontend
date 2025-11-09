import { Result } from '@core/entities'
import { executeService } from '@core/lib/service-helpers'
import { api } from '@lib/api'
import { UpdateRecord } from '@updates/types/update.type'

const SERVICE_NAME = 'listUpdatesService'

export async function listUpdatesService(
  organizationSlug: string
): Promise<Result<UpdateRecord[]>> {
  return executeService(
    SERVICE_NAME,
    () =>
      api.get<UpdateRecord[]>(`me/organizations/updates/${organizationSlug}`),
    { fallback: [] }
  )
}
