import { api } from '@/modules/common/lib/api'

type HasAccessResponse = {
  hasAccess: boolean
}

export async function userCanAccessOrganizationService(
  slug: string
): Promise<boolean> {
  try {
    const response = await api.get<HasAccessResponse>(
      `me/organizations/access/${slug}`
    )

    return response.hasAccess
  } catch (error) {
    const errorMessage = `[userCanAccessOrganizationService] ${
      error instanceof Error ? error.message : 'Unknown error occurred'
    }`
    console.error(errorMessage)
    return false
  }
}
