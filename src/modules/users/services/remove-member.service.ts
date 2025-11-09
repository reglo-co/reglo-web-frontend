import { Result } from '@core/entities'
import { executeService } from '@core/lib/service-helpers'
import { api } from '@lib/api'

const SERVICE_NAME = 'removeMemberService'

export async function removeMemberService(
  organizationSlug: string,
  memberId: string
): Promise<Result<boolean>> {
  return executeService(
    SERVICE_NAME,
    () =>
      api.post<boolean>(`me/organizations/members/${organizationSlug}/delete`, {
        memberId,
      }),
    { fallback: false }
  )
}
