import { ApiResponse } from '@core/entities'
import { auth0 } from '@lib/auth0'
import { OrganizationRepository } from '@organizations/repositories'
import { recordMemberRemoved } from '@updates/api/record-update.api'
import { MemberRepository } from '@users/repositories/member.repo'
import { z } from 'zod'

const handler = auth0.withApiAuthRequired(async function handler(
  req: Request,
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
  const actorId =
    (session?.user as { sub?: string } | undefined)?.sub ??
    userEmail ??
    'unknown'
  const actorName =
    (session?.user as { name?: string } | undefined)?.name ??
    userEmail ??
    'unknown'

  if (!userEmail) {
    return ApiResponse.unauthorized('Unauthorized')
  }

  const orgRepo = new OrganizationRepository()
  const canAccess = await orgRepo.me.userHasAccessToOrganization(
    organizationSlug,
    userEmail
  )
  if (!canAccess) {
    return ApiResponse.forbidden('Forbidden')
  }

  const body = await req.json().catch(() => ({}))
  const schema = z.object({
    memberId: z.string().min(1),
  })
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return ApiResponse.badRequest('Invalid payload')
  }
  const membersRepo = new MemberRepository()
  const member = await membersRepo.findById(parsed.data.memberId)
  await membersRepo.delete(parsed.data.memberId)
  await recordMemberRemoved({
    orgId: member?.orgId,
    orgSlug: organizationSlug,
    memberEmail: member?.email ?? 'membro',
    actorId,
    actorName,
  })
  return ApiResponse.ok(true)
})

export const POST = handler as (
  req: Request,
  context: { params?: Promise<Record<string, string | string[]>> }
) => Promise<Response> | Response
