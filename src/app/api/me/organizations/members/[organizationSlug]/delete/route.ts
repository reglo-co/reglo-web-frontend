import { ApiResponse } from '@core/entities'
import { ApiRouteHandler, RouteContext, getSingleParam } from '@lib/api'
import { getActorData, getSessionData } from '@lib/api/session.helpers'
import { auth0 } from '@lib/auth0'
import { OrganizationRepository } from '@organizations/repositories'
import { recordMemberRemoved } from '@updates/api/record-update.api'
import { MemberRepository } from '@users/repositories/member.repo'
import { z } from 'zod'

const deleteMemberSchema = z.object({
  memberId: z.string().min(1),
})

const handler = auth0.withApiAuthRequired(async function handler(
  req: Request,
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

  const orgRepo = new OrganizationRepository()
  const canAccess = await orgRepo.me.userHasAccessToOrganization(
    organizationSlug,
    userEmail
  )

  if (!canAccess) {
    return ApiResponse.forbidden('Forbidden')
  }

  const body = await req.json().catch(() => ({}))
  const parsed = deleteMemberSchema.safeParse(body)

  if (!parsed.success) {
    return ApiResponse.badRequest('Invalid payload')
  }

  const session = await auth0.getSession()
  const { actorId, actorName } = getActorData(session, userEmail)

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

export const POST = handler as ApiRouteHandler
