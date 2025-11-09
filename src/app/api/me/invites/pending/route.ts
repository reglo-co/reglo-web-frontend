import { ApiResponse } from '@core/entities'
import { InviteRepository } from '@invite/repositories/invite.repo'
import { auth0 } from '@lib/auth0'
import { SimpleApiRouteHandler } from '@lib/api'
import { getSessionData } from '@lib/api/session.helpers'

const handler = auth0.withApiAuthRequired(async function handler() {
  const sessionResult = await getSessionData()

  if (!sessionResult.success) {
    return sessionResult.response
  }

  const { userEmail } = sessionResult.data

  const repo = new InviteRepository()
  const list = await repo.findPendingByEmail(userEmail.toLowerCase())

  return ApiResponse.ok({ list, total: list.length })
})

export const GET = handler as SimpleApiRouteHandler
