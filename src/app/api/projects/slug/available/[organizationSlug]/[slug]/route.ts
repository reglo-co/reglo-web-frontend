import { ApiResponse } from '@/modules/common/entities'
import { ProjectRepository } from '@/modules/projects/repositories'

export async function GET(
  _req: Request,
  context: { params?: Promise<Record<string, string | string[]>> }
) {
  if (!context.params) {
    return ApiResponse.badRequest('Missing parameters')
  }

  const params = await context.params
  const slug = params.slug
  const organizationSlug = params.organizationSlug

  if (!slug || typeof slug !== 'string') {
    return ApiResponse.badRequest('Invalid slug parameter')
  }

  if (!organizationSlug || typeof organizationSlug !== 'string') {
    return ApiResponse.badRequest('Invalid organization slug parameter')
  }

  try {
    const repository = new ProjectRepository()
    const isAvailable = await repository.slugAvailable(slug, organizationSlug)
    return ApiResponse.ok({ isAvailable })
  } catch (error) {
    if (error instanceof Error) {
      return ApiResponse.internalServerError(
        `[GET /projects/slug/available] ${error.message}`
      )
    }
    return ApiResponse.internalServerError(
      `[GET /projects/slug/available] ${error}`
    )
  }
}
