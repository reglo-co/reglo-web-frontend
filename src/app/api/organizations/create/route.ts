import { ApiResponse } from '@/modules/common/entities'
import { OrganizationRepository } from '@/modules/organizations/domain/repositories'
import { auth0 } from '@lib/auth0'

export const POST = auth0.withApiAuthRequired(async function handler(
  request: Request
) {
  const session = await auth0.getSession()
  const ownerEmail = session?.user?.email
  const { name, slug } = await request.json()

  if (!ownerEmail) {
    return ApiResponse.unauthorized('Unauthorized')
  }

  const repository = new OrganizationRepository()

  try {
    const result = await repository.create({
      name,
      slug,
      ownerEmail,
      plan: 'starter',
    })

    return ApiResponse.created(result)
  } catch (error) {
    if (error instanceof Error) {
      return ApiResponse.internalServerError(
        `[POST /organizations/create] ${error.message}`
      )
    }

    return ApiResponse.internalServerError(
      `[POST /organizations/create] ${error}`
    )
  }
})
