import { ApiResponse } from '@core/entities'
import { auth0 } from '@lib/auth0'
import { ProjectRepository } from '@projects/repositories'

const handler = auth0.withApiAuthRequired(async function handler(
  _: Request,
  context: { params?: Promise<Record<string, string | string[]>> }
) {
  if (!context.params) {
    return ApiResponse.badRequest('Missing parameters')
  }

  const params = await context.params
  const organizationSlug = params.organization
  const projectSlug = params.project

  if (!organizationSlug || typeof organizationSlug !== 'string') {
    return ApiResponse.badRequest('Invalid organization parameter')
  }

  if (!projectSlug || typeof projectSlug !== 'string') {
    return ApiResponse.badRequest('Invalid project parameter')
  }

  const repository = new ProjectRepository()

  try {
    const result = await repository.oneBySlug(
      organizationSlug,
      projectSlug
    )
    return ApiResponse.ok(result)
  } catch (error) {
    return ApiResponse.internalServerError(
      `[GET /projects/${organizationSlug}/${projectSlug}] ${error}`
    )
  }
})

export const GET = handler as (
  req: Request,
  context: { params?: Promise<Record<string, string | string[]>> }
) => Promise<Response> | Response

