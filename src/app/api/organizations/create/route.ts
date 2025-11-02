import { ApiResponse } from '@/modules/common/entities'
import { OrganizationRepository } from '@/modules/organizations/domain/repositories'

export async function POST(request: Request) {
  const ownerId = '--teste--'
  const { name, slug } = await request.json()

  if (!ownerId) {
    return ApiResponse.unauthorized('Unauthorized')
  }

  const repository = new OrganizationRepository()

  try {
    const result = await repository.create({
      name,
      slug,
      ownerId,
      plan: 'starter',
    })

    return ApiResponse.created(result)
  } catch (error) {
    return ApiResponse.internalServerError('Internal server error')
  }
}
