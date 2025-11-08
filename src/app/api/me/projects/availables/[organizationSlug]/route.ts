import { ApiResponse } from '@core/entities'
import { ProjectRepository } from '@projects/repositories'
import { ProjectTable } from '@projects/types'
import { getAuth0UsersByEmailServer } from '@users/services/get-auth0-users-by-email.server'
import { auth0 } from '@lib/auth0'

const handler = auth0.withApiAuthRequired(async function handler(
  _: Request,
  context: { params?: Promise<Record<string, string | string[]>> }
) {
  if (!context.params) {
    return ApiResponse.badRequest('Missing organization slug')
  }

  const params = await context.params
  const organizationSlug = params.organizationSlug

  if (!organizationSlug || typeof organizationSlug !== 'string') {
    return ApiResponse.badRequest('Invalid organization slug')
  }

  const session = await auth0.getSession()
  const userEmail = session?.user?.email

  if (!userEmail) {
    return ApiResponse.unauthorized('Unauthorized')
  }

  const repository = new ProjectRepository()

  try {
    const list = await repository.me.availablesByOrganization({
      organizationSlug,
      userEmail,
    })

    const emails = Array.from(
      new Set(list.map((project) => project.ownerEmail).filter(Boolean))
    )
    const users = await getAuth0UsersByEmailServer(emails)
    const usersByEmail = new Map(
      users.map((user) => [user.email.toLowerCase(), user])
    )

    const projects: ProjectTable[] = list.map((project) => {
      const owner =
        usersByEmail.get(project.ownerEmail.toLowerCase()) ?? null
      const members = owner
        ? [
            {
              id: owner.id,
              name: owner.name,
              avatarUrl: owner.avatarUrl,
            },
          ]
        : []

      return {
        ...project,
        members,
        rulesCount: 0,
      }
    })

    return ApiResponse.ok({
      list: projects,
      total: projects.length,
    })
  } catch (error) {
    if (error instanceof Error) {
      return ApiResponse.internalServerError(
        `[GET /me/projects/availables/${organizationSlug}] ${error.message}`
      )
    }

    return ApiResponse.internalServerError(
      `[GET /me/projects/availables/${organizationSlug}] ${error}`
    )
  }
})

export const GET = handler as (
  req: Request,
  context: { params?: Promise<Record<string, string | string[]>> }
) => Promise<Response> | Response


