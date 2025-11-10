import { ApiResponse } from '@core/entities'
import { auth0 } from '@lib/auth0'
import { ProjectRepository } from '@projects/repositories'

import {
  ApiRouteHandler,
  RouteContext,
  handleApiError,
  validateRouteParams,
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

  const { organization, project } = paramsResult.params

  try {
    const repository = new ProjectRepository()
    const result = await repository.findOneBySlug(organization, project)
    return ApiResponse.ok(result)
  } catch (error) {
    return handleApiError(error, `GET /projects/${organization}/${project}`)
  }
})

export const GET = handler as ApiRouteHandler
