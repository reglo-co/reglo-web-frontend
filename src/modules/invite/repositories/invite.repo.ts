import { Invite, InviteStatus } from '@invite/types/invite.type'
import { FirebaseCollection } from '@lib/firebase'
import { OrganizationRepository } from '@organizations/repositories/organization.repo'
import { COLLECTION_NAMES, INVITE_STATUS } from '@repositories/repository.constants'
import { getCurrentTimestamp, normalizeEmail } from '@repositories/repository.utils'
import { z } from 'zod'

const inviteSchema = z.object({
  orgId: z.string().min(1),
  orgSlug: z.string().min(1),
  email: z.string().email(),
})

export class InviteRepository {
  private readonly collection: FirebaseCollection

  constructor() {
    this.collection = new FirebaseCollection(COLLECTION_NAMES.INVITES)
  }

  public async findById(id: string): Promise<Invite | null> {
    const data = await this.collection.withId(id)
    return (data as Invite | undefined) ?? null
  }

  public async createMany(
    invites: Omit<Invite, 'id' | 'createdAt' | 'status'>[]
  ): Promise<string[]> {
    const createdIds: string[] = []
    
    for (const item of invites) {
      inviteSchema.parse(item)
      const id = await this.collection.create({
        ...item,
        email: normalizeEmail(item.email),
        status: INVITE_STATUS.PENDING as InviteStatus,
        createdAt: getCurrentTimestamp(),
      })
      createdIds.push(id)
    }
    
    return createdIds
  }

  public async findByOrganizationSlug(orgSlug: string): Promise<Invite[]> {
    const result = await this.collection.query
      .equal('orgSlug', orgSlug)
      .build()
    return result as Invite[]
  }

  public async findPendingByOrganizationSlug(orgSlug: string): Promise<Invite[]> {
    const result = await this.collection.query
      .equal('orgSlug', orgSlug)
      .equal('status', INVITE_STATUS.PENDING)
      .build()
    return result as Invite[]
  }

  public async findPendingByEmail(email: string): Promise<Invite[]> {
    const result = await this.collection.query
      .equal('email', normalizeEmail(email))
      .equal('status', INVITE_STATUS.PENDING)
      .build()

    if (result.length === 0) {
      return []
    }

    return await this.enrichInvitesWithOrgNames(result as Invite[])
  }

  public async updateStatus(id: string, status: InviteStatus): Promise<void> {
    await this.collection.update(id, { status })
  }

  public async cancelById(id: string): Promise<void> {
    await this.updateStatus(id, INVITE_STATUS.CANCELLED as InviteStatus)
  }

  private async enrichInvitesWithOrgNames(invites: Invite[]): Promise<Invite[]> {
    const orgRepo = new OrganizationRepository()
    const uniqueSlugs = Array.from(new Set(invites.map((invite) => invite.orgSlug)))
    const orgs = await orgRepo.findManyBySlugs(uniqueSlugs)

    return invites.map((invite) => {
      const org = orgs.find((o) => o.slug === invite.orgSlug)
      return {
        ...invite,
        orgName: org?.name ?? invite.orgSlug,
      }
    })
  }
}
