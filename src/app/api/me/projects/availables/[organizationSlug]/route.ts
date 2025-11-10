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

    console.log(`[DEBUG] Searching members for project: ${project.slug}`)
    console.log(`[DEBUG] organizationSlug param: "${organizationSlug}"`)
    console.log(
      `[DEBUG] project.organizationSlug: "${project.organizationSlug}"`
    )

    const projectMembers = await membersRepo.findByProject(
      organizationSlug,
      project.slug
    )

    console.log(`[DEBUG] Project: ${project.slug}`)
    console.log(`[DEBUG] ProjectMembers found:`, projectMembers)

    const memberEmails = projectMembers
      .filter((m) => m.email)
      .map((m) => m.email.toLowerCase())

    console.log(`[DEBUG] Member emails:`, memberEmails)

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

    console.log(`[DEBUG] Enriching project: ${project.slug}`)
    console.log(`[DEBUG] All emails for project:`, allEmails)
    console.log(`[DEBUG] Users by email map size:`, usersByEmail.size)

    const members = allEmails.map((email) => {
      const user = usersByEmail.get(email)
      console.log(`[DEBUG] Email: ${email}, User found:`, user ? 'YES' : 'NO')
      return user
        ? { id: user.id, name: user.name, avatarUrl: user.avatarUrl }
        : { id: email, name: email, avatarUrl: undefined }
    })

    console.log(`[DEBUG] Final members for ${project.slug}:`, members)

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

    console.log('[DEBUG] All unique emails collected:', Array.from(allEmails))

    const usersResult = await getAuth0UsersByEmailServer(Array.from(allEmails))
    const users = usersResult.getDataOrDefault([])

    console.log('[DEBUG] Users found from Auth0:', users.length)
    console.log('[DEBUG] Users data:', users)

    const usersByEmail = new Map(
      users.map((user) => [user.email.toLowerCase(), user])
    )

    const enrichedProjects = enrichProjectsWithUserData(
      projectsData,
      usersByEmail
    )

    console.log('[DEBUG] Enriched projects count:', enrichedProjects.length)
    console.log(
      '[DEBUG] Enriched projects:',
      JSON.stringify(enrichedProjects, null, 2)
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
