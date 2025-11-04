import { ApiResponse } from '@/modules/common/entities'
import { OrganizationRepository } from '@/modules/organizations/repositories'
import { auth0 } from '@lib/auth0'

const handler = auth0.withApiAuthRequired(async function handler() {
  const session = await auth0.getSession()
  const ownerEmail = session?.user?.email

  if (!ownerEmail) {
    return ApiResponse.unauthorized('Unauthorized')
  }

  const repository = new OrganizationRepository()

  try {
    const result = await repository.me.createdAll({ ownerEmail })

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
})

export const GET = handler as (req: Request) => Promise<Response> | Response
