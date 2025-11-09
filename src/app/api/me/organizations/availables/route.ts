import { ApiResponse } from '@core/entities'
import { auth0 } from '@lib/auth0'
import { OrganizationRepository } from '@organizations/repositories'
import { MemberRepository } from '@users/repositories/member.repo'

const handler = auth0.withApiAuthRequired(async function handler() {
  const session = await auth0.getSession()
  const userEmail = session?.user?.email
  const userId = (session?.user as { sub?: string } | undefined)?.sub

  if (!userEmail || !userId) {
    return ApiResponse.unauthorized('Unauthorized')
  }

  const organizationRepository = new OrganizationRepository()
  const ownedOrganizations = await organizationRepository.me.findAllCreatedByOwner({ ownerEmail: userEmail })

  const memberRepository = new MemberRepository()
  const userMemberships = await memberRepository.findByUserId(userId)

  const organizationsBySlug = new Map<string, Awaited<ReturnType<typeof organizationRepository.findOneBySlug>>>()
  const memberOrganizations = []
  
  for (const membership of userMemberships) {
    if (!organizationsBySlug.has(membership.orgSlug)) {
      const organization = await organizationRepository.findOneBySlug(membership.orgSlug)
      organizationsBySlug.set(membership.orgSlug, organization)
    }
    const organization = organizationsBySlug.get(membership.orgSlug)
    if (organization) {
      memberOrganizations.push(organization)
    }
  }

  const uniqueOrganizationsById = new Map<string, unknown>()
  const allOrganizations = [...ownedOrganizations, ...memberOrganizations]
  
  for (const organization of allOrganizations) {
    if (organization && typeof organization === 'object' && 'id' in organization && (organization as any).id) {
      uniqueOrganizationsById.set((organization as any).id as string, organization)
    }
  }
  
  const list = Array.from(uniqueOrganizationsById.values())

  return ApiResponse.ok({ list, total: list.length })
})

export const GET = handler as () => Promise<Response> | Response


