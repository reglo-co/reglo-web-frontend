import { ApiResponse } from '@core/entities'
import { InviteRepository } from '@invite/repositories/invite.repo'
import { auth0 } from '@lib/auth0'
import { OrganizationRepository } from '@organizations/repositories'
import {
  getSingleParam,
  RouteContext,
  ApiRouteHandler,
} from '@lib/api'
import { getSessionData } from '@lib/api/session.helpers'
import { z } from 'zod'

const cancelInviteSchema = z.object({
  inviteId: z.string().min(1),
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
  const parsed = cancelInviteSchema.safeParse(body)

  if (!parsed.success) {
    return ApiResponse.badRequest('Invalid payload')
  }

  const invitesRepo = new InviteRepository()
  await invitesRepo.cancelById(parsed.data.inviteId)

  return ApiResponse.ok(true)
})

export const POST = handler as ApiRouteHandler
