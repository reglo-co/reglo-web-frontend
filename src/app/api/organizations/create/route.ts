import { ApiResponse } from '@core/entities'
import { auth0 } from '@lib/auth0'
import { OrganizationRepository } from '@organizations/repositories'
import { recordOrganizationCreated } from '@updates/api/record-update.api'
import { handleApiError } from '@lib/api'
import { getSessionData, getActorData } from '@lib/api/session.helpers'

const handler = auth0.withApiAuthRequired(async function handler(
  request: Request
) {
  const sessionResult = await getSessionData()

  if (!sessionResult.success) {
    return sessionResult.response
  }

  const { userEmail: ownerEmail } = sessionResult.data

  const { name, slug } = await request.json()

  try {
    const session = await auth0.getSession()
    const { actorId, actorName } = getActorData(session, ownerEmail)

    const repository = new OrganizationRepository()
    const orgId = await repository.create({
      name,
      slug,
      ownerEmail,
      plan: 'starter',
    })

    await recordOrganizationCreated({
      orgId,
      orgSlug: slug,
      actorId,
      actorName,
    })

    return ApiResponse.created(orgId)
  } catch (error) {
    return handleApiError(error, 'POST /organizations/create')
  }
})

export const POST = handler as (req: Request) => Promise<Response> | Response
