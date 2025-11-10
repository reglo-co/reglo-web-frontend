import { ApiResponse } from '@core/entities'
import { getSessionData } from '@lib/api/session.helpers'
import { auth0 } from '@lib/auth0'
import { ProjectMemberRepository } from '@projects-members/repositories'
import { ProjectRepository } from '@projects/repositories'
import { ProjectTable } from '@projects/types'
import { getAuth0UsersByEmailServer } from '@users/services/get-auth0-users-by-email.server'

import {
  ApiRouteHandler,
  RouteContext,
  getSingleParam,
  handleApiError,
} from '@lib/api'

type ProjectWithMembersEmails = {
  project: Awaited<
    ReturnType<ProjectRepository['me']['availablesByOrganization']>
  >[number]
  memberEmails: string[]
}

async function collectProjectsWithMembers(
  projects: Awaited<
    ReturnType<ProjectRepository['me']['availablesByOrganization']>
  >,
  organizationSlug: string,
  membersRepo: ProjectMemberRepository
): Promise<{
  projectsData: ProjectWithMembersEmails[]
  allEmails: Set<string>
}> {
  const projectsData: ProjectWithMembersEmails[] = []
  const allEmails = new Set<string>()

  for (const project of projects) {
    if (project.ownerEmail) {
      allEmails.add(project.ownerEmail.toLowerCase())
    }

    const projectMembers = await membersRepo.findByProject(
      organizationSlug,
      project.slug
    )

    const memberEmails = projectMembers
      .filter((me) => me.email)
      .map((member) => member.email.toLowerCase())

    memberEmails.forEach((email) => allEmails.add(email))

    projectsData.push({
      project,
      memberEmails,
    })
  }

  return { projectsData, allEmails }
}

function enrichProjectsWithUserData(
  projectsData: ProjectWithMembersEmails[],
  usersByEmail: Map<string, { id: string; name: string; avatarUrl?: string }>
): ProjectTable[] {
  return projectsData.map(({ project, memberEmails }) => {
    const allEmails = Array.from(
      new Set([project.ownerEmail.toLowerCase(), ...memberEmails])
    )

    const members = allEmails.map((email) => {
      const user = usersByEmail.get(email)
      return user
        ? { id: user.id, name: user.name, avatarUrl: user.avatarUrl }
        : { id: email, name: email, avatarUrl: undefined }
    })

    return {
      ...project,
      members,
      rulesCount: 0,
    }
  })
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
    const membersRepo = new ProjectMemberRepository()

    const projects = await repository.me.availablesByOrganization({
      organizationSlug,
      userEmail,
    })

    const { projectsData, allEmails } = await collectProjectsWithMembers(
      projects,
      organizationSlug,
      membersRepo
    )

    const usersResult = await getAuth0UsersByEmailServer(Array.from(allEmails))
    const users = usersResult.getDataOrDefault([])

    const usersByEmail = new Map(
      users.map((user) => [user.email.toLowerCase(), user])
    )

    const enrichedProjects = enrichProjectsWithUserData(
      projectsData,
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
