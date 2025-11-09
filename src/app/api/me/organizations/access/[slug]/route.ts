import { ApiResponse } from '@core/entities'
import { OrganizationRepository } from '@organizations/repositories'
import { auth0 } from '@lib/auth0'
import {
  getSingleParam,
  handleApiError,
  RouteContext,
  ApiRouteHandler,
} from '@lib/api'
import { getSessionData } from '@lib/api/session.helpers'

const handler = auth0.withApiAuthRequired(async function handler(
  _: Request,
  context: RouteContext
) {
  const paramResult = await getSingleParam(context, 'slug')

  if (!paramResult.success) {
    return paramResult.response
  }

  const { value: slug } = paramResult

  const sessionResult = await getSessionData()

  if (!sessionResult.success) {
    return sessionResult.response
  }

  const { userEmail } = sessionResult.data

  try {
    const repository = new OrganizationRepository()
    const hasAccess = await repository.me.userHasAccessToOrganization(
      slug,
      userEmail
    )

    return ApiResponse.ok({ hasAccess })
  } catch (error) {
    return handleApiError(error, `GET /me/organizations/access/${slug}`)
  }
})

export const GET = handler as ApiRouteHandler
