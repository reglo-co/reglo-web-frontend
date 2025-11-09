import { ApiResponse } from '@core/entities'
import { InviteRepository } from '@invite/repositories/invite.repo'
import { auth0 } from '@lib/auth0'

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
  if (!userEmail) {
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

  await invites.updateStatus(invite.id, 'cancelled')
  return ApiResponse.ok(true)
})

export const POST = handler as (
  req: Request,
  context: { params?: Promise<Record<string, string | string[]>> }
) => Promise<Response> | Response
