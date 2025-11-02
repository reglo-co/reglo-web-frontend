import { ApiResponse } from '@/modules/common/entities'
import { OrganizationRepository } from '@/modules/organizations/domain/repositories'

export async function GET(
  _: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const userId = '--teste--'
  const { slug } = await context.params

  if (!userId) {
    return ApiResponse.unauthorized('Unauthorized')
  }

  const repository = new OrganizationRepository()

  try {
    const result = await repository.slugAvailable(slug)
    return ApiResponse.ok(result)
  } catch (error) {
    return ApiResponse.internalServerError(
      `[GET /organizations/slug/available/${slug}] ${error}`
    )
  }
}
