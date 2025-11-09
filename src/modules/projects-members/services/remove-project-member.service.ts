import { Result } from '@core/entities'
import { api } from '@lib/api'
import { executeService } from '@core/lib/service-helpers'

const SERVICE_NAME = 'removeProjectMemberService'

export async function removeProjectMemberService(
  organizationSlug: string,
  projectSlug: string,
  email: string
): Promise<Result<void>> {
  return executeService(
    SERVICE_NAME,
    () => api.delete<void>(
      `projects/members/${organizationSlug}/${projectSlug}?email=${encodeURIComponent(email)}`
    )
  )
}


