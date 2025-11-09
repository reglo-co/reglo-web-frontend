import { ApiResponse } from '@core/entities'
import { InviteRepository } from '@invite/repositories/invite.repo'
import { auth0 } from '@lib/auth0'
import {
  getSingleParam,
  RouteContext,
  ApiRouteHandler,
} from '@lib/api'
import { getSessionData } from '@lib/api/session.helpers'

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

  const { userEmail } = sessionResult.data

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

  await invites.updateStatus(invite.id, 'cancelled')

  return ApiResponse.ok(true)
})

export const POST = handler as ApiRouteHandler
