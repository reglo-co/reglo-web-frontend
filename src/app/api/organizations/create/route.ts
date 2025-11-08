import { ApiResponse } from '@core/entities'
import { OrganizationRepository } from '@organizations/repositories'
import { auth0 } from '@lib/auth0'

const handler = auth0.withApiAuthRequired(async function handler(
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

export const POST = handler as (req: Request) => Promise<Response> | Response
