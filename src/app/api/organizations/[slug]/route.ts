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

  const repository = new OrganizationRepository()

  try {
    const result = await repository.oneBySlug(slug)
    return ApiResponse.ok(result)
  } catch (error) {
    return ApiResponse.internalServerError(
      `[GET /organizations/${slug}] ${error}`
    )
  }
})

export const GET = handler as (
  req: Request,
  context: { params?: Promise<Record<string, string | string[]>> }
) => Promise<Response> | Response
