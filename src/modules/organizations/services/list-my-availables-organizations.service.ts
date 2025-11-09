import { api } from '@lib/api'
import { Organization } from '@organizations/types'

export async function listMyAvailablesOrganizationsService(): Promise<{
  list: Organization[]
  total: number
}> {
  return api.get<{ list: Organization[]; total: number }>(
    'me/organizations/availables'
  )
}


