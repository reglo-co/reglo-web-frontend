import { ApiResponse } from '@core/entities'
import { OrganizationRepository } from '@organizations/repositories'
import { auth0 } from '@lib/auth0'

const handler = auth0.withApiAuthRequired(async function handler(
  _: Request,
  context: { params?: Promise<Record<string, string | string[]>> }
) {
  if (!context.params) {
    return ApiResponse.badRequest('Missing slug parameter')
  }

  const params = await context.params
  const slug = params.slug

  if (!slug || typeof slug !== 'string') {
    return ApiResponse.badRequest('Invalid slug parameter')
  }

  const session = await auth0.getSession()
  const ownerEmail = session?.user?.email

  if (!ownerEmail) {
    return ApiResponse.unauthorized('Unauthorized')
  }

  const repository = new OrganizationRepository()

  try {
    const hasAccess = await repository.me.userHasAccessToOrganization(slug, ownerEmail)

    return ApiResponse.ok({ hasAccess })
  } catch (error: unknown) {
    if (error instanceof Error) {
      return ApiResponse.internalServerError(
        `[GET /me/organizations/access/${slug}] ${error.message}`
      )
    }

    return ApiResponse.internalServerError(
      `[GET /me/organizations/access/${slug}] ${error}`
    )
  }
})

export const GET = handler as (
  req: Request,
  context: { params?: Promise<Record<string, string | string[]>> }
) => Promise<Response> | Response
