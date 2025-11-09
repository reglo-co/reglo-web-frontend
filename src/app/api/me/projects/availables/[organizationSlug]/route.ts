import { ApiResponse } from '@core/entities'
import { ProjectRepository } from '@projects/repositories'
import { ProjectTable } from '@projects/types'
import { getAuth0UsersByEmailServer } from '@users/services/get-auth0-users-by-email.server'
import { auth0 } from '@lib/auth0'
import { ProjectMemberRepository } from '@projects-members/repositories'

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

    const membersRepo = new ProjectMemberRepository()
    // collect all emails (owners + project members across all projects)
    const emailsSet = new Set<string>()
    for (const project of list) {
      if (project.ownerEmail) emailsSet.add(project.ownerEmail.toLowerCase())
      const projectMembers = await membersRepo.byProject(
        organizationSlug,
        project.slug
      )
      for (const m of projectMembers) {
        if (m.email) emailsSet.add(m.email.toLowerCase())
      }
    }
    const users = await getAuth0UsersByEmailServer(Array.from(emailsSet))
    const usersByEmail = new Map(
      users.map((user) => [user.email.toLowerCase(), user])
    )

    const projects: ProjectTable[] = []
    for (const project of list) {
      const projectMembers = await membersRepo.byProject(
        organizationSlug,
        project.slug
      )
      const allEmails = Array.from(
        new Set([
          project.ownerEmail.toLowerCase(),
          ...projectMembers.map((m) => m.email.toLowerCase()),
        ])
      )
      const members = allEmails.map((email) => {
        const u = usersByEmail.get(email)
        if (!u) {
          return { id: email, name: email, avatarUrl: undefined }
        }
        return { id: u.id, name: u.name, avatarUrl: u.avatarUrl }
      })

      projects.push({
        ...project,
        members,
        rulesCount: 0,
      })
    }

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


