import { ApiResponse } from '@core/entities'
import { InviteRepository } from '@invite/repositories/invite.repo'
import { auth0 } from '@lib/auth0'
import { MemberRepository } from '@users/repositories/member.repo'
import { recordMemberAdded } from '@updates/api/record-update.api'

const handler = auth0.withApiAuthRequired(async function handler(
  _: Request,
  context: { params?: Promise<Record<string, string | string[]>> }
) {
  if (!context.params) {
    return ApiResponse.badRequest('Missing inviteId')
  }
  const params = await context.params
  const inviteId = params.inviteId
  if (!inviteId || typeof inviteId !== 'string') {
    return ApiResponse.badRequest('Invalid inviteId')
  }

  const session = await auth0.getSession()
  const userEmail = session?.user?.email
  const userId = (session?.user as { sub?: string } | undefined)?.sub
  const actorName =
    (session?.user as { name?: string } | undefined)?.name ?? userEmail

  if (!userEmail || !userId) {
    return ApiResponse.unauthorized('Unauthorized')
  }

  const invites = new InviteRepository()
  const invite = await invites.withId(inviteId)
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
    actorName: actorName ?? userEmail,
  })
  return ApiResponse.ok(true)
})

export const POST = handler as (
  req: Request,
  context: { params?: Promise<Record<string, string | string[]>> }
) => Promise<Response> | Response
