import { ApiResponse } from '@core/entities'
import { InviteRepository } from '@invite/repositories/invite.repo'
import { auth0 } from '@lib/auth0'
import { OrganizationRepository } from '@organizations/repositories'
import { MemberRepository } from '@users/repositories/member.repo'
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
    const membersRepo = new MemberRepository()
    const invitesRepo = new InviteRepository()

    const memberRecords = await membersRepo.byOrganizationSlug(organizationSlug)
    const pendingInvites =
      await invitesRepo.pendingByOrganizationSlug(organizationSlug)

    const ownerRecords = [...records]

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
    const profilesByEmail = new Map(
      profiles.map((profile) => [profile.email.toLowerCase(), profile])
    )

    const activeOwners: OrganizationMember[] = ownerRecords.map((record) => {
      const profile = profilesByEmail.get(record.email.toLowerCase())
      return {
        id: profile?.id ?? record.email,
        name: profile?.name ?? record.email,
        email: record.email,
        avatarUrl: profile?.avatarUrl ?? null,
        role: record.role,
        joinedAt: record.joinedAt,
        status: 'active',
      }
    })

    const activeMembers: OrganizationMember[] = memberRecords.map((m) => {
      const profile = profilesByEmail.get(m.email.toLowerCase())
      return {
        id: m.id,
        name: profile?.name ?? m.email,
        email: m.email,
        avatarUrl: profile?.avatarUrl ?? null,
        role: 'member',
        joinedAt: m.joinedAt,
        status: 'active',
      }
    })

    const pendingList: OrganizationMember[] = pendingInvites.map((invite) => {
      const profile = profilesByEmail.get(invite.email.toLowerCase())
      return {
        id: invite.id,
        name: profile?.name ?? invite.email,
        email: invite.email,
        avatarUrl: profile?.avatarUrl ?? null,
        role: 'member',
        joinedAt: invite.createdAt,
        status: 'pending',
      }
    })

    const list = [...activeOwners, ...activeMembers, ...pendingList]

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
