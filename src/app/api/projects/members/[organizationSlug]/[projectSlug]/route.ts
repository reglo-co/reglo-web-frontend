import { ApiResponse } from '@core/entities'
import { auth0 } from '@lib/auth0'
import { OrganizationRepository } from '@organizations/repositories'
import { ProjectMemberRepository } from '@projects-members/repositories'
import { ProjectRepository } from '@projects/repositories'
import {
  validateRouteParams,
  RouteContext,
  ApiRouteHandler,
} from '@lib/api'
import { getSessionData } from '@lib/api/session.helpers'

async function validateProjectAccess(
  organizationSlug: string,
  projectSlug: string,
  userEmail: string
): Promise<
  | { hasAccess: false; response: Response; project?: never }
  | {
      hasAccess: true
      response?: never
      project: Awaited<ReturnType<ProjectRepository['findOneBySlug']>>
    }
> {
  const orgRepo = new OrganizationRepository()
  const canAccessOrg = await orgRepo.me.userHasAccessToOrganization(
    organizationSlug,
    userEmail
  )

  if (!canAccessOrg) {
    return { hasAccess: false, response: ApiResponse.forbidden('Forbidden') }
  }

  const projectRepo = new ProjectRepository()
  const project = await projectRepo.findOneBySlug(organizationSlug, projectSlug)

  if (!project) {
    return {
      hasAccess: false,
      response: ApiResponse.notFound('Project not found'),
    }
  }

  return { hasAccess: true, project }
}

const handler = auth0.withApiAuthRequired(async function handler(
  _: Request,
  context: RouteContext
): Promise<Response> {
  const sessionResult = await getSessionData()

  if (!sessionResult.success) {
    return sessionResult.response
  }

  const { userEmail } = sessionResult.data

  const paramsResult = await validateRouteParams<{
    organizationSlug: string
    projectSlug: string
  }>(context, ['organizationSlug', 'projectSlug'])

  if (!paramsResult.success) {
    return paramsResult.response
  }

  const { organizationSlug, projectSlug } = paramsResult.params

  const accessResult = await validateProjectAccess(
    organizationSlug,
    projectSlug,
    userEmail
  )

  if (!accessResult.hasAccess) {
    return accessResult.response
  }

  const { project } = accessResult

  if (!project) {
    return ApiResponse.notFound('Project not found')
  }

  const membersRepo = new ProjectMemberRepository()
  const members = await membersRepo.findByProject(organizationSlug, projectSlug)

  const list = [
    {
      id: project.ownerEmail,
      email: project.ownerEmail,
      role: 'owner',
      joinedAt: project.createdAt,
    },
    ...members.map((m) => ({
      id: m.id,
      email: m.email,
      role: 'member',
      joinedAt: m.joinedAt,
    })),
  ]

  return ApiResponse.ok({ list, total: list.length })
})

export const GET = handler as ApiRouteHandler
