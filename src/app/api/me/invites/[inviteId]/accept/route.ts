import { ApiResponse } from '@core/entities'
import { InviteRepository } from '@invite/repositories/invite.repo'
import { ApiRouteHandler, RouteContext, getSingleParam } from '@lib/api'
import { getSessionData } from '@lib/api/session.helpers'
import { auth0 } from '@lib/auth0'
import { recordMemberAdded } from '@updates/api/record-update.api'
import { MemberRepository } from '@users/repositories/member.repo'

const handler = auth0.withApiAuthRequired(async function handler(
  _: Request,
  context: RouteContext
) {
  const paramResult = await getSingleParam(context, 'inviteId')

  if (!paramResult.success) {
    return paramResult.response
  }

  const { value: inviteId } = paramResult

  const sessionResult = await getSessionData()

  if (!sessionResult.success) {
    return sessionResult.response
  }

  const { userEmail, userId, userName } = sessionResult.data

  const invites = new InviteRepository()
  const invite = await invites.findById(inviteId)

  if (!invite) {
    return ApiResponse.notFound('Invite not found')
  }

  if (invite.status !== 'pending') {
    return ApiResponse.badRequest('Invite is not pending')
  }

  if (invite.email.toLowerCase() !== userEmail.toLowerCase()) {
    return ApiResponse.forbidden('Forbidden')
  }

  const members = new MemberRepository()
  await members.create({
    userId,
    orgId: invite.orgId,
    orgSlug: invite.orgSlug,
    email: invite.email.toLowerCase(),
    role: 'member',
  })

  await invites.updateStatus(invite.id, 'accepted')

  await recordMemberAdded({
    orgId: invite.orgId,
    orgSlug: invite.orgSlug,
    memberEmail: invite.email.toLowerCase(),
    actorId: userId,
    actorName: userName,
  })

  return ApiResponse.ok(true)
})

export const POST = handler as ApiRouteHandler
