import { ApiResponse } from '@/modules/common/entities'
import { ProjectRepository } from '@/modules/projects/repositories'
import { auth0 } from '@lib/auth0'

const handler = auth0.withApiAuthRequired(async function handler(
  request: Request
): Promise<Response> {
  const session = await auth0.getSession()
  const userEmail = session?.user?.email
  const { name, slug, organizationSlug } = await request.json()

  if (!userEmail) {
    return ApiResponse.unauthorized('Unauthorized')
  }

  if (!name || !slug || !organizationSlug) {
    return ApiResponse.badRequest('Missing required fields')
  }

  const repository = new ProjectRepository()

  try {
    const result = await repository.create({
      name,
      slug,
      organizationSlug,
      ownerEmail: userEmail,
    })

    return ApiResponse.created(result)
  } catch (error) {
    if (error instanceof Error) {
      return ApiResponse.internalServerError(
        `[POST /projects/create] ${error.message}`
      )
    }

    return ApiResponse.internalServerError(`[POST /projects/create] ${error}`)
  }
})

export const POST = handler as (req: Request) => Promise<Response> | Response


