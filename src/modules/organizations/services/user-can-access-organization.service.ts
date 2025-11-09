import { Result } from '@core/entities'
import { executeService } from '@core/lib/service-helpers'
import { api } from '@lib/api'

const SERVICE_NAME = 'userCanAccessOrganizationService'

type HasAccessResponse = {
  hasAccess: boolean
}

export async function userCanAccessOrganizationService(
  slug: string
): Promise<Result<boolean>> {
  return executeService(
    SERVICE_NAME,
    async () => {
      const response = await api.get<HasAccessResponse>(
        `me/organizations/access/${slug}`
      )
      return response.hasAccess
    },
    { fallback: false }
  )
}
