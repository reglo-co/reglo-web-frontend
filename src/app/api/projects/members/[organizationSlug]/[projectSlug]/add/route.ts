import { ApiResponse } from '@core/entities'
import { auth0 } from '@lib/auth0'
import { OrganizationRepository } from '@organizations/repositories'
import { ProjectMemberRepository } from '@projects-members/repositories'
import { ProjectRepository } from '@projects/repositories'
import {
  validateRouteParams,
  handleApiError,
  RouteContext,
  ApiRouteHandler,
} from '@lib/api'
import { getSessionData } from '@lib/api/session.helpers'

const handler = auth0.withApiAuthRequired(async function handler(
  request: Request,
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

  try {
    const orgRepo = new OrganizationRepository()
    const canAccessOrg = await orgRepo.me.userHasAccessToOrganization(
      organizationSlug,
      userEmail
    )

    if (!canAccessOrg) {
      return ApiResponse.forbidden('Forbidden')
    }

    const projectRepo = new ProjectRepository()
    const project = await projectRepo.findOneBySlug(
      organizationSlug,
      projectSlug
    )

    if (!project) {
      return ApiResponse.notFound('Project not found')
    }

    const { email } = (await request.json()) as { email?: string }

    if (!email || typeof email !== 'string') {
      return ApiResponse.badRequest('Missing email')
    }

    const normalized = email.toLowerCase()

    if (normalized === project.ownerEmail.toLowerCase()) {
      return ApiResponse.ok({ id: normalized })
    }

    const membersRepo = new ProjectMemberRepository()
    const exists = await membersRepo.findByProjectAndEmail(
      organizationSlug,
      projectSlug,
      normalized
    )

    if (exists) {
      return ApiResponse.ok({ id: exists.id })
    }

    const id = await membersRepo.create({
      orgSlug: organizationSlug,
      projectSlug,
      email: normalized,
    })

    return ApiResponse.created({ id })
  } catch (error) {
    return handleApiError(error, 'POST /projects/members/add')
  }
})

export const POST = handler as ApiRouteHandler

