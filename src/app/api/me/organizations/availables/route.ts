import { ApiResponse } from '@core/entities'
import { auth0 } from '@lib/auth0'
import { OrganizationRepository } from '@organizations/repositories'
import { MemberRepository } from '@users/repositories/member.repo'
import { SimpleApiRouteHandler } from '@lib/api'
import { getSessionData } from '@lib/api/session.helpers'

type Organization = Awaited<
  ReturnType<OrganizationRepository['findOneBySlug']>
>

async function fetchMemberOrganizations(
  memberRepository: MemberRepository,
  organizationRepository: OrganizationRepository,
  userId: string
): Promise<Organization[]> {
  const userMemberships = await memberRepository.findByUserId(userId)
  const organizationsBySlug = new Map<string, Organization>()
  const memberOrganizations: Organization[] = []

  for (const membership of userMemberships) {
    if (!organizationsBySlug.has(membership.orgSlug)) {
      const organization = await organizationRepository.findOneBySlug(
        membership.orgSlug
      )
      organizationsBySlug.set(membership.orgSlug, organization)
    }

    const organization = organizationsBySlug.get(membership.orgSlug)
    if (organization) {
      memberOrganizations.push(organization)
    }
  }

  return memberOrganizations
}

function deduplicateOrganizations(organizations: Organization[]) {
  const uniqueOrganizationsById = new Map<string, Organization>()

  for (const organization of organizations) {
    if (
      organization &&
      typeof organization === 'object' &&
      'id' in organization &&
      organization.id
    ) {
      uniqueOrganizationsById.set(organization.id as string, organization)
    }
  }

  return Array.from(uniqueOrganizationsById.values())
}

const handler = auth0.withApiAuthRequired(async function handler() {
  const sessionResult = await getSessionData()

  if (!sessionResult.success) {
    return sessionResult.response
  }

  const { userEmail, userId } = sessionResult.data

  const organizationRepository = new OrganizationRepository()
  const ownedOrganizations =
    await organizationRepository.me.findAllCreatedByOwner({
      ownerEmail: userEmail,
    })

  const memberRepository = new MemberRepository()
  const memberOrganizations = await fetchMemberOrganizations(
    memberRepository,
    organizationRepository,
    userId
  )

  const allOrganizations = [...ownedOrganizations, ...memberOrganizations]
  const list = deduplicateOrganizations(allOrganizations)

  return ApiResponse.ok({ list, total: list.length })
})

export const GET = handler as SimpleApiRouteHandler


