import { ApiResponse } from '@core/entities'
import { ProjectRepository } from '@projects/repositories'
import { auth0 } from '@lib/auth0'
import { recordProjectCreated } from '@updates/api/record-update.api'
import { OrganizationRepository } from '@organizations/repositories'

const handler = auth0.withApiAuthRequired(async function handler(
  request: Request
): Promise<Response> {
  const session = await auth0.getSession()
  const userEmail = session?.user?.email
  const actorId = (session?.user as { sub?: string } | undefined)?.sub ?? userEmail ?? 'unknown'
  const actorName =
    (session?.user as { name?: string } | undefined)?.name ?? userEmail ?? 'unknown'
  const { name, slug, organizationSlug } = await request.json()

  if (!userEmail) {
    return ApiResponse.unauthorized('Unauthorized')
  }

  if (!name || !slug || !organizationSlug) {
    return ApiResponse.badRequest('Missing required fields')
  }

  const repository = new ProjectRepository()
  const orgRepo = new OrganizationRepository()
  const organization = await orgRepo.oneBySlug(organizationSlug)

  try {
    const result = await repository.create({
      name,
      slug,
      organizationSlug,
      ownerEmail: userEmail,
    })

    if (result) {
      await recordProjectCreated({
        orgId: organization?.id,
        orgSlug: organizationSlug,
        projectSlug: slug,
        projectName: name,
        actorId,
        actorName,
      })
    }

    return ApiResponse.created(result)
  } catch (error) {
    if (error instanceof Error) {
      return ApiResponse.internalServerError(
        `[POST /projects/create] ${error.message}`
      )
    }

    return ApiResponse.internalServerError(`[POST /projects/create] ${error}`)
  }
})

export const POST = handler as (req: Request) => Promise<Response> | Response


