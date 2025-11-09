import { ApiResponse } from '@core/entities'
import { auth0 } from '@lib/auth0'
import { OrganizationRepository } from '@organizations/repositories'
import { UpdatesRepository } from '@updates/repositories/updates.repo'
import {
  getSingleParam,
  handleApiError,
  RouteContext,
  ApiRouteHandler,
} from '@lib/api'
import { getSessionData } from '@lib/api/session.helpers'

const handler = auth0.withApiAuthRequired(async function handler(
  _: Request,
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

  try {
    const repo = new UpdatesRepository()
    const list = await repo.findByOrganizationSlug(organizationSlug, 50)
    return ApiResponse.ok(list)
  } catch (error) {
    return handleApiError(
      error,
      `GET /me/organizations/updates/${organizationSlug}`
    )
  }
})

export const GET = handler as ApiRouteHandler
