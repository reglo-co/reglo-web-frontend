import { Result } from '@core/entities'
import { api } from '@lib/api'
import { executeService } from '@core/lib/service-helpers'

const SERVICE_NAME = 'addProjectMemberService'

export async function addProjectMemberService(
  organizationSlug: string,
  projectSlug: string,
  email: string
): Promise<Result<void>> {
  return executeService(
    SERVICE_NAME,
    () => api.post<void>(`projects/members/${organizationSlug}/${projectSlug}`, { email })
  )
}


