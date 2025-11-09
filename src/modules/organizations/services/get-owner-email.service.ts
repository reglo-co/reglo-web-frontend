import { Result } from '@core/entities'
import { executeService } from '@core/lib/service-helpers'

const SERVICE_NAME = 'getOwnerEmail'

type OwnerEmailResponse = {
  ownerEmail: string | null
}

export async function getOwnerEmail(
  organizationSlug: string
): Promise<Result<string | null>> {
  return executeService(
    SERVICE_NAME,
    async () => {
      const response = await fetch(
        `/api/organizations/owner-email/${organizationSlug}`
      )
      if (!response.ok) {
        throw new Error(`Failed to fetch owner email: ${response.status}`)
      }
      const data: OwnerEmailResponse = await response.json()
      return data.ownerEmail
    },
    { fallback: null }
  )
}
