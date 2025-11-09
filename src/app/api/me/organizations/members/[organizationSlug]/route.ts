import { ApiResponse } from '@core/entities'
import { auth0 } from '@lib/auth0'
import {
  OrganizationMemberRecord,
  OrganizationRepository,
} from '@organizations/repositories'
import { getAuth0UsersByEmailServer } from '@users/services'
import { OrganizationMember } from '@users/types'

const handler = auth0.withApiAuthRequired(async function handler(
  _: Request,
  context: { params?: Promise<Record<string, string | string[]>> }
) {
  if (!context.params) {
    return ApiResponse.badRequest('Missing organization slug')
  }

  const params = await context.params
  const organizationSlug = params.organizationSlug

  if (!organizationSlug || typeof organizationSlug !== 'string') {
    return ApiResponse.badRequest('Invalid organization slug')
  }

  const session = await auth0.getSession()
  const userEmail = session?.user?.email

  if (!userEmail) {
    return ApiResponse.unauthorized('Unauthorized')
  }

  const repository = new OrganizationRepository()

  const canAccess = await repository.me.hasAccess(organizationSlug, userEmail)

  if (!canAccess) {
    return ApiResponse.forbidden('Forbidden')
  }

  try {
    const records = await repository.members(organizationSlug)

    const emails = Array.from(
      new Set(records.map((member) => member.email).filter(Boolean))
    )

    const profiles = await getAuth0UsersByEmailServer(emails)
    const profilesByEmail = new Map(
      profiles.map((profile) => [profile.email.toLowerCase(), profile])
    )

    const mapRecordToMember = (
      record: OrganizationMemberRecord
    ): OrganizationMember => {
      const profile = profilesByEmail.get(record.email.toLowerCase())

      return {
        id: profile?.id ?? record.email,
        name: profile?.name ?? record.email,
        email: record.email,
        avatarUrl: profile?.avatarUrl ?? null,
        role: record.role,
        joinedAt: record.joinedAt,
      }
    }

    const list = records.map(mapRecordToMember)

    return ApiResponse.ok({
      list,
      total: list.length,
    })
  } catch (error) {
    if (error instanceof Error) {
      return ApiResponse.internalServerError(
        `[GET /me/organizations/members/${organizationSlug}] ${error.message}`
      )
    }

    return ApiResponse.internalServerError(
      `[GET /me/organizations/members/${organizationSlug}] ${error}`
    )
  }
})

export const GET = handler as (
  req: Request,
  context: { params?: Promise<Record<string, string | string[]>> }
) => Promise<Response> | Response
