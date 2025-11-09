import { FirebaseCollection } from '@lib/firebase'

export type MemberRecord = {
  id: string
  userId: string
  orgId: string
  orgSlug: string
  email: string
  role: 'member'
  joinedAt: string
}

export class MemberRepository {
  private readonly collection: FirebaseCollection

  constructor() {
    this.collection = new FirebaseCollection('members')
  }

  public async byOrganizationSlug(orgSlug: string): Promise<MemberRecord[]> {
    const result = await this.collection.query.equal('orgSlug', orgSlug).build()
    return result as MemberRecord[]
  }

  public async byUserId(userId: string): Promise<MemberRecord[]> {
    const result = await this.collection.query.equal('userId', userId).build()
    return result as MemberRecord[]
  }

  public async create(record: Omit<MemberRecord, 'id' | 'joinedAt'>) {
    const id = await this.collection.create({
      ...record,
      joinedAt: new Date().toUTCString(),
    })
    return id
  }

  public async delete(id: string) {
    await this.collection.delete(id)
  }
}


