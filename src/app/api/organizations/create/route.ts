import { ApiResponse } from '@/modules/common/entities'
import { OrganizationRepository } from '@/modules/organizations/domain/repositories'
import { auth } from '@clerk/nextjs/server'

export async function POST(request: Request) {
  const { userId: ownerId } = await auth()
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
