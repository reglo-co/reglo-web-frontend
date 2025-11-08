import { ApiResponse } from '@core/entities'
import { ProjectRepository } from '@projects/repositories'
import { auth0 } from '@lib/auth0'

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

  const repository = new ProjectRepository()

  try {
    const list = await repository.me.availablesByOrganization({
      organizationSlug,
      userEmail,
    })

    return ApiResponse.ok({
      list,
      total: list.length,
    })
  } catch (error) {
    if (error instanceof Error) {
      return ApiResponse.internalServerError(
        `[GET /me/projects/availables/${organizationSlug}] ${error.message}`
      )
    }

    return ApiResponse.internalServerError(
      `[GET /me/projects/availables/${organizationSlug}] ${error}`
    )
  }
})

export const GET = handler as (
  req: Request,
  context: { params?: Promise<Record<string, string | string[]>> }
) => Promise<Response> | Response


