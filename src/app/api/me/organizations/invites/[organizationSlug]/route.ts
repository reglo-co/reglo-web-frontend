import { ApiResponse } from '@core/entities'
import { InviteRepository } from '@invite/repositories/invite.repo'
import { auth0 } from '@lib/auth0'
import { OrganizationRepository } from '@organizations/repositories'
import { MemberRepository } from '@users/repositories/member.repo'
import { z } from 'zod'

const handler = auth0.withApiAuthRequired(async function handler(
  req: Request,
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

  const orgRepo = new OrganizationRepository()
  const canAccess = await orgRepo.me.hasAccess(organizationSlug, userEmail)
  if (!canAccess) {
    return ApiResponse.forbidden('Forbidden')
  }

  const body = await req.json().catch(() => ({}))
  const schema = z.object({
    emails: z.array(z.string().email()).min(1),
  })
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return ApiResponse.badRequest('Invalid payload')
  }
  const emails = Array.from(
    new Set(parsed.data.emails.map((e) => e.toLowerCase().trim()))
  )

  const organization = await orgRepo.oneBySlug(organizationSlug)
  if (!organization) {
    return ApiResponse.notFound('Organization not found')
  }

  const membersRepo = new MemberRepository()
  const invitesRepo = new InviteRepository()

  const existingMembers = await membersRepo.byOrganizationSlug(organizationSlug)
  const existingMemberEmails = new Set(
    existingMembers.map((m) => m.email.toLowerCase())
  )
  const existingInvites =
    await invitesRepo.pendingByOrganizationSlug(organizationSlug)
  const existingInviteEmails = new Set(
    existingInvites.map((i) => i.email.toLowerCase())
  )

  const toCreate = emails
    .filter((email) => !existingMemberEmails.has(email))
    .filter((email) => !existingInviteEmails.has(email))
    .map((email) => ({
      orgId: organization.id,
      orgSlug: organization.slug,
      orgName: organization.name,
      email,
    }))

  if (toCreate.length === 0) {
    return ApiResponse.ok({ created: 0 })
  }

  await invitesRepo.createMany(toCreate)

  return ApiResponse.ok({ created: toCreate.length })
})

export const POST = handler as (
  req: Request,
  context: { params?: Promise<Record<string, string | string[]>> }
) => Promise<Response> | Response
