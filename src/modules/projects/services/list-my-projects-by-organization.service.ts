import { api } from '@lib/api'
import type { ProjectTable } from '@projects/types'

type ListMyProjectsByOrganizationResponse = {
  list: ProjectTable[]
  total: number
}

export async function listMyProjectsByOrganizationService(
  organizationSlug: string
): Promise<ListMyProjectsByOrganizationResponse> {
  try {
    const response = await api.get<ListMyProjectsByOrganizationResponse>(
      `me/projects/availables/${organizationSlug}`
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


