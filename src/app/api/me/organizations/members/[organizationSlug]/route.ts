import { ApiResponse } from '@core/entities'
import { InviteRepository } from '@invite/repositories/invite.repo'
import { auth0 } from '@lib/auth0'
import { OrganizationRepository } from '@organizations/repositories'
import { MemberRepository } from '@users/repositories/member.repo'
import { getAuth0UsersByEmailServer } from '@users/services'
import { OrganizationMember } from '@users/types'
import {
  getSingleParam,
  handleApiError,
  RouteContext,
  ApiRouteHandler,
} from '@lib/api'
import { getSessionData } from '@lib/api/session.helpers'

function createProfileMap(
  profiles: Awaited<ReturnType<typeof getAuth0UsersByEmailServer>>
) {
  return new Map(
    profiles.map((profile) => [profile.email.toLowerCase(), profile])
  )
}

function mapToOrganizationMembers<
  T extends { email: string; joinedAt?: Date | string; createdAt?: Date | string }
>(
  records: T[],
  profilesByEmail: ReturnType<typeof createProfileMap>,
  getRoleAndId: (record: T) => { role: 'owner' | 'member'; id: string },
  status: 'active' | 'pending'
): OrganizationMember[] {
  return records.map((record) => {
    const profile = profilesByEmail.get(record.email.toLowerCase())
    const { role, id } = getRoleAndId(record)
    const joinedAt = record.joinedAt ?? record.createdAt

    return {
      id,
      name: profile?.name ?? record.email,
      email: record.email,
      avatarUrl: profile?.avatarUrl ?? null,
      role,
      joinedAt: joinedAt instanceof Date ? joinedAt.toISOString() : (joinedAt as string),
      status,
    }
  })
}

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

  const repository = new OrganizationRepository()
  const canAccess = await repository.me.userHasAccessToOrganization(
    organizationSlug,
    userEmail
  )

  if (!canAccess) {
    return ApiResponse.forbidden('Forbidden')
  }

  try {
    const ownerRecords = await repository.findMembers(organizationSlug)
    const membersRepo = new MemberRepository()
    const invitesRepo = new InviteRepository()

    const memberRecords =
      await membersRepo.findByOrganizationSlug(organizationSlug)
    const pendingInvites =
      await invitesRepo.findPendingByOrganizationSlug(organizationSlug)

    const emails = Array.from(
      new Set(
        [
          ...ownerRecords.map((member) => member.email),
          ...memberRecords.map((m) => m.email),
          ...pendingInvites.map((i) => i.email),
        ].filter(Boolean)
      )
    )

    const profiles = await getAuth0UsersByEmailServer(emails)
    const profilesByEmail = createProfileMap(profiles)

    const activeOwners = mapToOrganizationMembers(
      ownerRecords,
      profilesByEmail,
      (record) => ({
        role: (record.role === 'owner' ? 'owner' : 'member') as 'owner' | 'member',
        id: record.email,
      }),
      'active'
    )

    const activeMembers = mapToOrganizationMembers(
      memberRecords,
      profilesByEmail,
      (record) => ({ role: 'member' as const, id: record.id }),
      'active'
    )

    const pendingList = mapToOrganizationMembers(
      pendingInvites as Array<{ email: string; createdAt: Date | string; id: string }>,
      profilesByEmail,
      (record) => ({ role: 'member' as const, id: record.id }),
      'pending'
    )

    const list = [...activeOwners, ...activeMembers, ...pendingList]

    return ApiResponse.ok({
      list,
      total: list.length,
    })
  } catch (error) {
    return handleApiError(
      error,
      `GET /me/organizations/members/${organizationSlug}`
    )
  }
})

export const GET = handler as ApiRouteHandler
