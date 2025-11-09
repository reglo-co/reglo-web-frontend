import { Result } from '@core/entities'
import { executeService } from '@core/lib/service-helpers'
import { api } from '@lib/api'

const SERVICE_NAME = 'inviteMembersService'

type InviteMembersResponse = {
  created: number
}

export async function inviteMembersService(
  organizationSlug: string,
  emails: string[]
): Promise<Result<InviteMembersResponse>> {
  return executeService(
    SERVICE_NAME,
    () =>
      api.post<InviteMembersResponse>(
        `me/organizations/invites/${organizationSlug}`,
        { emails }
      ),
    { fallback: { created: 0 } }
  )
}
