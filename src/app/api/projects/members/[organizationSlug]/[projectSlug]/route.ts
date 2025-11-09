import { ApiResponse } from '@core/entities'
import { auth0 } from '@lib/auth0'
import { OrganizationRepository } from '@organizations/repositories'
import { ProjectMemberRepository } from '@projects-members/repositories'
import { ProjectRepository } from '@projects/repositories'

type RouteContext = {
  params?: Promise<Record<string, string | string[]>>
}

const handler = auth0.withApiAuthRequired(async function handler(
  request: Request,
  context: RouteContext
): Promise<Response> {
  const session = await auth0.getSession()
  const userEmail = session?.user?.email

  if (!userEmail) {
    return ApiResponse.unauthorized('Unauthorized')
  }

  if (!context.params) {
    return ApiResponse.badRequest('Missing parameters')
  }

  const params = await context.params
  const organizationSlug = params.organizationSlug
  const projectSlug = params.projectSlug

  if (
    !organizationSlug ||
    !projectSlug ||
    typeof organizationSlug !== 'string' ||
    typeof projectSlug !== 'string'
  ) {
    return ApiResponse.badRequest('Invalid parameters')
  }

  const orgRepo = new OrganizationRepository()
  const canAccessOrg = await orgRepo.me.userHasAccessToOrganization(
    organizationSlug,
    userEmail
  )

  if (!canAccessOrg) {
    return ApiResponse.forbidden('Forbidden')
  }

  const projectRepo = new ProjectRepository()
  const project = await projectRepo.findOneBySlug(organizationSlug, projectSlug)
  if (!project) {
    return ApiResponse.notFound('Project not found')
  }

  const membersRepo = new ProjectMemberRepository()

  if (request.method === 'GET') {
    const members = await membersRepo.findByProject(
      organizationSlug,
      projectSlug
    )
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
  }

  if (request.method === 'POST') {
    const { email } = (await request.json()) as { email?: string }
    if (!email || typeof email !== 'string') {
      return ApiResponse.badRequest('Missing email')
    }
    const normalized = email.toLowerCase()
    if (normalized === project.ownerEmail.toLowerCase()) {
      return ApiResponse.ok({ id: normalized })
    }
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
  }

  if (request.method === 'DELETE') {
    const url = new URL(request.url)
    const email = url.searchParams.get('email')
    if (!email) {
      return ApiResponse.badRequest('Missing email')
    }
    const normalized = email.toLowerCase()
    if (normalized === project.ownerEmail.toLowerCase()) {
      return ApiResponse.forbidden('Cannot remove owner')
    }
    const record = await membersRepo.findByProjectAndEmail(
      organizationSlug,
      projectSlug,
      normalized
    )
    if (!record) {
      return ApiResponse.notFound('Member not found')
    }
    await membersRepo.delete(record.id)
    return ApiResponse.noContent()
  }

  return ApiResponse.badRequest('Method not allowed')
})

export const GET = handler as (
  req: Request,
  context: RouteContext
) => Promise<Response> | Response
export const POST = handler as (
  req: Request,
  context: RouteContext
) => Promise<Response> | Response
export const DELETE = handler as (
  req: Request,
  context: RouteContext
) => Promise<Response> | Response
