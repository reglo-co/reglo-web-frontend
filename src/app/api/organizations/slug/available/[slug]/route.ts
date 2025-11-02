import { ApiResponse } from '@/modules/common/entities'
import { OrganizationRepository } from '@/modules/organizations/domain/repositories'
import { auth } from '@clerk/nextjs/server'

export async function GET(
  _: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { userId } = await auth()
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
