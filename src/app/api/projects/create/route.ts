import { ApiResponse } from '@core/entities'
import { auth0 } from '@lib/auth0'
import { OrganizationRepository } from '@organizations/repositories'
import { ProjectRepository } from '@projects/repositories'
import { recordProjectCreated } from '@updates/api/record-update.api'
import { handleApiError } from '@lib/api'
import { getSessionData, getActorData } from '@lib/api/session.helpers'

const handler = auth0.withApiAuthRequired(async function handler(
  request: Request
): Promise<Response> {
  const sessionResult = await getSessionData()

  if (!sessionResult.success) {
    return sessionResult.response
  }

  const { userEmail } = sessionResult.data

  const { name, slug, organizationSlug } = await request.json()

  if (!name || !slug || !organizationSlug) {
    return ApiResponse.badRequest('Missing required fields')
  }

  try {
    const session = await auth0.getSession()
    const { actorId, actorName } = getActorData(session, userEmail)

    const orgRepo = new OrganizationRepository()
    const organization = await orgRepo.findOneBySlug(organizationSlug)

    const repository = new ProjectRepository()
    const result = await repository.create({
      name,
      slug,
      organizationSlug,
      ownerEmail: userEmail,
    })

    await recordProjectCreated({
      orgId: organization?.id,
      orgSlug: organizationSlug,
      projectSlug: slug,
      projectName: name,
      actorId,
      actorName,
    })

    return ApiResponse.created(result)
  } catch (error) {
    return handleApiError(error, 'POST /projects/create')
  }
})

export const POST = handler as (req: Request) => Promise<Response> | Response
