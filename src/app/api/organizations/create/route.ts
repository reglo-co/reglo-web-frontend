import { ApiResponse } from '@core/entities'
import { auth0 } from '@lib/auth0'
import { OrganizationRepository } from '@organizations/repositories'
import { recordOrganizationCreated } from '@updates/api/record-update.api'

const handler = auth0.withApiAuthRequired(async function handler(
  request: Request
) {
  const session = await auth0.getSession()
  const ownerEmail = session?.user?.email
  const actorId =
    (session?.user as { sub?: string } | undefined)?.sub ??
    ownerEmail ??
    'unknown'
  const actorName =
    (session?.user as { name?: string } | undefined)?.name ??
    ownerEmail ??
    'unknown'
  const { name, slug } = await request.json()

  if (!ownerEmail) {
    return ApiResponse.unauthorized('Unauthorized')
  }

  const repository = new OrganizationRepository()

  try {
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
    if (error instanceof Error) {
      return ApiResponse.internalServerError(
        `[POST /organizations/create] ${error.message}`
      )
    }

    return ApiResponse.internalServerError(
      `[POST /organizations/create] ${error}`
    )
  }
})

export const POST = handler as (req: Request) => Promise<Response> | Response
