import { ApiResponse } from '@core/entities'
import { ProjectRepository } from '@projects/repositories'
import { ProjectTable } from '@projects/types'
import { getAuth0UsersByEmailServer } from '@users/services/get-auth0-users-by-email.server'
import { auth0 } from '@lib/auth0'
import { ProjectMemberRepository } from '@projects-members/repositories'
import {
  getSingleParam,
  handleApiError,
  RouteContext,
  ApiRouteHandler,
} from '@lib/api'
import { getSessionData } from '@lib/api/session.helpers'

async function collectAllProjectEmails(
  projects: Awaited<
    ReturnType<ProjectRepository['me']['availablesByOrganization']>
  >,
  organizationSlug: string,
  membersRepo: ProjectMemberRepository
): Promise<Set<string>> {
  const emailsSet = new Set<string>()

  for (const project of projects) {
    if (project.ownerEmail) {
      emailsSet.add(project.ownerEmail.toLowerCase())
    }

    const projectMembers = await membersRepo.findByProject(
      organizationSlug,
      project.slug
    )

    for (const member of projectMembers) {
      if (member.email) {
        emailsSet.add(member.email.toLowerCase())
      }
    }
  }

  return emailsSet
}

async function enrichProjectsWithMembers(
  projects: Awaited<
    ReturnType<ProjectRepository['me']['availablesByOrganization']>
  >,
  organizationSlug: string,
  membersRepo: ProjectMemberRepository,
  usersByEmail: Map<string, { id: string; name: string; avatarUrl?: string }>
): Promise<ProjectTable[]> {
  const enrichedProjects: ProjectTable[] = []

  for (const project of projects) {
    const projectMembers = await membersRepo.findByProject(
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
      const user = usersByEmail.get(email)
      return user
        ? { id: user.id, name: user.name, avatarUrl: user.avatarUrl }
        : { id: email, name: email, avatarUrl: undefined }
    })

    enrichedProjects.push({
      ...project,
      members,
      rulesCount: 0,
    })
  }

  return enrichedProjects
}

const handler = auth0.withApiAuthRequired(async function handler(
  _: Request,
  context: RouteContext
) {
  const paramResult = await getSingleParam(context, 'organizationSlug')

  if (!paramResult.success) {
    return paramResult.response
  }

  const { value: organizationSlug } = paramResult

  const sessionResult = await getSessionData()

  if (!sessionResult.success) {
    return sessionResult.response
  }

  const { userEmail } = sessionResult.data

  try {
    const repository = new ProjectRepository()
    const projects = await repository.me.availablesByOrganization({
      organizationSlug,
      userEmail,
    })

    const membersRepo = new ProjectMemberRepository()
    const emailsSet = await collectAllProjectEmails(
      projects,
      organizationSlug,
      membersRepo
    )

    const users = await getAuth0UsersByEmailServer(Array.from(emailsSet))
    const usersByEmail = new Map(
      users.map((user) => [user.email.toLowerCase(), user])
    )

    const enrichedProjects = await enrichProjectsWithMembers(
      projects,
      organizationSlug,
      membersRepo,
      usersByEmail
    )

    return ApiResponse.ok({
      list: enrichedProjects,
      total: enrichedProjects.length,
    })
  } catch (error) {
    return handleApiError(
      error,
      `GET /me/projects/availables/${organizationSlug}`
    )
  }
})

export const GET = handler as ApiRouteHandler


