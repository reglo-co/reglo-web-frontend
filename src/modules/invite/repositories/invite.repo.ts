import { Invite, InviteStatus } from '@invite/types/invite.type'
import { FirebaseCollection } from '@lib/firebase'
import { OrganizationRepository } from '@organizations/repositories/organization.repo'
import { z } from 'zod'

export class InviteRepository {
  private readonly collection: FirebaseCollection

  constructor() {
    this.collection = new FirebaseCollection('invite')
  }

  public async withId(id: string): Promise<Invite | null> {
    const data = await this.collection.withId(id)
    return (data as Invite) ?? null
  }

  public async createMany(
    invites: Omit<Invite, 'id' | 'createdAt' | 'status'>[]
  ) {
    const schema = z.object({
      orgId: z.string().min(1),
      orgSlug: z.string().min(1),
      email: z.string().email(),
    })
    const createdIds: string[] = []
    for (const item of invites) {
      schema.parse(item)
      const id = await this.collection.create({
        ...item,
        status: 'pending' as InviteStatus,
        createdAt: new Date().toUTCString(),
      })
      createdIds.push(id)
    }
    return createdIds
  }

  public async byOrganizationSlug(orgSlug: string): Promise<Invite[]> {
    const result = await this.collection.query.equal('orgSlug', orgSlug).build()
    return result as Invite[]
  }

  public async pendingByOrganizationSlug(orgSlug: string): Promise<Invite[]> {
    const result = await this.collection.query
      .equal('orgSlug', orgSlug)
      .equal('status', 'pending')
      .build()
    return result as Invite[]
  }

  public async pendingByEmail(email: string): Promise<Invite[]> {
    const result = await this.collection.query
      .equal('email', email.toLowerCase())
      .equal('status', 'pending')
      .build()

    if (result.length === 0) {
      return []
    }

    const orgRepo = new OrganizationRepository()
    const uniqueSlugs = Array.from(new Set(result.map((r) => r.orgSlug)))
    const orgs = await orgRepo.manyBySlug(uniqueSlugs)

    const invitesWithOrgName = result.map((r) => {
      const org = orgs.find((o) => o.slug === r.orgSlug)
      return {
        ...r,
        orgName: org?.name ?? r.orgSlug,
      }
    })

    return invitesWithOrgName as Invite[]
  }

  public async updateStatus(id: string, status: InviteStatus) {
    await this.collection.update(id, { status })
  }

  public async cancelById(id: string) {
    await this.updateStatus(id, 'cancelled')
  }
}
