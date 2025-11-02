import { api } from '@/modules/common/lib/api'
import type { Organization } from '@/modules/organizations/domain/types'

type ListMyOrganizationsResponse = {
  list: Organization[]
  total: number
}

export async function listMyOrganizationsService(): Promise<ListMyOrganizationsResponse> {
  try {
    const response = await api.get<ListMyOrganizationsResponse>(
      '/me/organizations/created'
    )

    return response
  } catch (error) {
    console.error(error)

    return {
      list: [],
      total: 0,
    }
  }
}
