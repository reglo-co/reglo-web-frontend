import { ApiResponse } from '@core/entities'
import { OrganizationRepository } from '@organizations/repositories'
import { auth0 } from '@lib/auth0'
import {
  handleApiError,
  SimpleApiRouteHandler,
} from '@lib/api'
import { getSessionData } from '@lib/api/session.helpers'

const handler = auth0.withApiAuthRequired(async function handler() {
  const sessionResult = await getSessionData()

  if (!sessionResult.success) {
    return sessionResult.response
  }

  const { userEmail: ownerEmail } = sessionResult.data

  try {
    const repository = new OrganizationRepository()
    const result = await repository.me.findAllCreatedByOwner({ ownerEmail })

    return ApiResponse.ok({
      list: result,
      total: result.length,
    })
  } catch (error) {
    return handleApiError(error, 'GET /me/organizations/created')
  }
})

export const GET = handler as SimpleApiRouteHandler
