import { ApiResponse } from '@/modules/common/entities'
import { OrganizationRepository } from '@/modules/organizations/domain/repositories'
import { auth } from '@clerk/nextjs/server'

export async function GET() {
  const { userId } = await auth()

  if (!userId) {
    return ApiResponse.unauthorized('Unauthorized')
  }

  const repository = new OrganizationRepository()

  try {
    const result = await repository.me.createdAll({ userId })
    console.log('repository result', result)

    return ApiResponse.ok({
      list: result,
      total: result.length,
    })
  } catch (error: unknown) {
    if (error instanceof Error) {
      return ApiResponse.internalServerError(
        `[GET /me/organizations] ${error.message}`
      )
    }

    return ApiResponse.internalServerError(`[GET /me/organizations] ${error}`)
  }
}
