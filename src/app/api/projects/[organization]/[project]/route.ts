import { ApiResponse } from '@core/entities'
import { auth0 } from '@lib/auth0'
import { ProjectRepository } from '@projects/repositories'
import {
  validateRouteParams,
  handleApiError,
  RouteContext,
  ApiRouteHandler,
} from '@lib/api'

const handler = auth0.withApiAuthRequired(async function handler(
  _: Request,
  context: RouteContext
) {
  const paramsResult = await validateRouteParams<{
    organization: string
    project: string
  }>(context, ['organization', 'project'])

  if (!paramsResult.success) {
    return paramsResult.response
  }

  const { organization: organizationSlug, project: projectSlug } =
    paramsResult.params

  try {
    const repository = new ProjectRepository()
    const result = await repository.findOneBySlug(
      organizationSlug,
      projectSlug
    )
    return ApiResponse.ok(result)
  } catch (error) {
    return handleApiError(
      error,
      `GET /projects/${organizationSlug}/${projectSlug}`
    )
  }
})

export const GET = handler as ApiRouteHandler

