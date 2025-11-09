import { api } from '@lib/api'
import { OrganizationMembersResponse } from '@users/types'

export async function listOrganizationMembersService(
  organizationSlug: string
): Promise<OrganizationMembersResponse> {
  try {
    const response = await api.get<OrganizationMembersResponse>(
      `me/organizations/members/${organizationSlug}`
    )
    return response
  } catch (error) {
    // console.error(error)
    return {
      list: [],
      total: 0,
    }
  }
}
