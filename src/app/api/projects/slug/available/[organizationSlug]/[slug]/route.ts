import { ApiResponse } from '@core/entities'
import { ProjectRepository } from '@projects/repositories'
import { validateRouteParams, handleApiError, RouteContext } from '@lib/api'

export async function GET(_req: Request, context: RouteContext) {
  const paramsResult = await validateRouteParams<{
    slug: string
    organizationSlug: string
  }>(context, ['slug', 'organizationSlug'])

  if (!paramsResult.success) {
    return paramsResult.response
  }

  const { slug, organizationSlug } = paramsResult.params

  try {
    const repository = new ProjectRepository()
    const isAvailable = await repository.isSlugAvailable(slug, organizationSlug)
    return ApiResponse.ok({ isAvailable })
  } catch (error) {
    return handleApiError(error, 'GET /projects/slug/available')
  }
}
