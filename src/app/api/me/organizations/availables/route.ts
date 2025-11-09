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

  const orgRepo = new OrganizationRepository()
  const owned = await orgRepo.me.createdAll({ ownerEmail: userEmail })

  const membersRepo = new MemberRepository()
  const membershipsFiltered = await membersRepo.byUserId(userId)

  const orgsBySlug = new Map<string, Awaited<ReturnType<typeof orgRepo.oneBySlug>>>()
  const memberOrgs = []
  for (const m of membershipsFiltered) {
    if (!orgsBySlug.has(m.orgSlug)) {
      orgsBySlug.set(m.orgSlug, await orgRepo.oneBySlug(m.orgSlug))
    }
    const org = orgsBySlug.get(m.orgSlug)
    if (org) memberOrgs.push(org)
  }

  const dedup = new Map<string, unknown>()
  for (const org of [...owned, ...memberOrgs]) {
    if (org && typeof org === 'object' && 'id' in org && (org as any).id) {
      dedup.set((org as any).id as string, org)
    }
  }
  const list = Array.from(dedup.values())

  return ApiResponse.ok({ list, total: list.length })
})

export const GET = handler as () => Promise<Response> | Response


