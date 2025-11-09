import { ApiResponse } from '@core/entities'
import { OrganizationRepository } from '@organizations/repositories'
import { auth0 } from '@lib/auth0'
import {
  getSingleParam,
  handleApiError,
  RouteContext,
  ApiRouteHandler,
} from '@lib/api'

const handler = auth0.withApiAuthRequired(async function handler(
  _: Request,
  context: RouteContext
) {
  const paramResult = await getSingleParam(context, 'slug')

  if (!paramResult.success) {
    return paramResult.response
  }

  const { value: slug } = paramResult

  try {
    const repository = new OrganizationRepository()
    const result = await repository.isSlugAvailable(slug)
    return ApiResponse.ok(result)
  } catch (error) {
    return handleApiError(error, `GET /organizations/slug/available/${slug}`)
  }
})

export const GET = handler as ApiRouteHandler
