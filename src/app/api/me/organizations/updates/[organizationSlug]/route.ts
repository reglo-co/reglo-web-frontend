import { ApiResponse } from '@core/entities'
import { auth0 } from '@lib/auth0'
import { OrganizationRepository } from '@organizations/repositories'
import { UpdatesRepository } from '@updates/repositories/updates.repo'

const handler = auth0.withApiAuthRequired(async function handler(
  _: Request,
  context: { params?: Promise<Record<string, string | string[]>> }
) {
  if (!context.params) {
    return ApiResponse.badRequest('Missing organization slug')
  }

  const params = await context.params
  const organizationSlug = params.organizationSlug

  if (!organizationSlug || typeof organizationSlug !== 'string') {
    return ApiResponse.badRequest('Invalid organization slug')
  }

  const session = await auth0.getSession()
  const userEmail = session?.user?.email

  if (!userEmail) {
    return ApiResponse.unauthorized('Unauthorized')
  }

  const orgRepo = new OrganizationRepository()
  const canAccess = await orgRepo.me.hasAccess(organizationSlug, userEmail)
  if (!canAccess) {
    return ApiResponse.forbidden('Forbidden')
  }

  try {
    const repo = new UpdatesRepository()
    const list = await repo.listByOrganizationSlug(organizationSlug, 50)
    return ApiResponse.ok(list)
  } catch (error) {
    if (error instanceof Error) {
      return ApiResponse.internalServerError(
        `[GET /me/organizations/updates/${organizationSlug}] ${error.message}`
      )
    }
    return ApiResponse.internalServerError(
      `[GET /me/organizations/updates/${organizationSlug}] ${error}`
    )
  }
})

export const GET = handler as (
  req: Request,
  context: { params?: Promise<Record<string, string | string[]>> }
) => Promise<Response> | Response


