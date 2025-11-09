import { ApiResponse } from '@core/entities'
import { InviteRepository } from '@invite/repositories/invite.repo'
import { auth0 } from '@lib/auth0'
import { OrganizationRepository } from '@organizations/repositories'
import { MemberRepository } from '@users/repositories/member.repo'
import {
  getSingleParam,
  RouteContext,
  ApiRouteHandler,
} from '@lib/api'
import { getSessionData } from '@lib/api/session.helpers'
import { z } from 'zod'

const inviteSchema = z.object({
  emails: z.array(z.string().email()).min(1),
})

function normalizeEmails(emails: string[]): string[] {
  return Array.from(new Set(emails.map((e) => e.toLowerCase().trim())))
}

async function filterNewInvites(
  emails: string[],
  organizationSlug: string,
  organization: { id: string; slug: string; name: string }
) {
  const membersRepo = new MemberRepository()
  const invitesRepo = new InviteRepository()

  const existingMembers =
    await membersRepo.findByOrganizationSlug(organizationSlug)
  const existingMemberEmails = new Set(
    existingMembers.map((m) => m.email.toLowerCase())
  )

  const existingInvites =
    await invitesRepo.findPendingByOrganizationSlug(organizationSlug)
  const existingInviteEmails = new Set(
    existingInvites.map((i) => i.email.toLowerCase())
  )

  return emails
    .filter((email) => !existingMemberEmails.has(email))
    .filter((email) => !existingInviteEmails.has(email))
    .map((email) => ({
      orgId: organization.id,
      orgSlug: organization.slug,
      orgName: organization.name,
      email,
    }))
}

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
  const parsed = inviteSchema.safeParse(body)

  if (!parsed.success) {
    return ApiResponse.badRequest('Invalid payload')
  }

  const emails = normalizeEmails(parsed.data.emails)

  const organization = await orgRepo.findOneBySlug(organizationSlug)

  if (!organization) {
    return ApiResponse.notFound('Organization not found')
  }

  const toCreate = await filterNewInvites(emails, organizationSlug, organization)

  if (toCreate.length === 0) {
    return ApiResponse.ok({ created: 0 })
  }

  const invitesRepo = new InviteRepository()
  await invitesRepo.createMany(toCreate)

  return ApiResponse.ok({ created: toCreate.length })
})

export const POST = handler as ApiRouteHandler
