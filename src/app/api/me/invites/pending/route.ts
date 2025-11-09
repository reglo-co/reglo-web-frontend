import { ApiResponse } from '@core/entities'
import { InviteRepository } from '@invite/repositories/invite.repo'
import { auth0 } from '@lib/auth0'

const handler = auth0.withApiAuthRequired(async function handler() {
  const session = await auth0.getSession()
  const userEmail = session?.user?.email

  if (!userEmail) {
    return ApiResponse.unauthorized('Unauthorized')
  }

  const repo = new InviteRepository()
  const list = await repo.findPendingByEmail(userEmail.toLowerCase())
  return ApiResponse.ok({ list, total: list.length })
})

export const GET = handler as () => Promise<Response> | Response
