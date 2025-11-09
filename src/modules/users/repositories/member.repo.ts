import { FirebaseCollection } from '@lib/firebase'
import { COLLECTION_NAMES, ROLE } from '@repositories/repository.constants'
import { getCurrentTimestamp, normalizeEmail } from '@repositories/repository.utils'

export type MemberRecord = {
  id: string
  userId: string
  orgId: string
  orgSlug: string
  email: string
  role: typeof ROLE.MEMBER
  joinedAt: string
}

export class MemberRepository {
  private readonly collection: FirebaseCollection

  constructor() {
    this.collection = new FirebaseCollection(COLLECTION_NAMES.MEMBERS)
  }

  public async findById(id: string): Promise<MemberRecord | null> {
    const result = await this.collection.withId(id)
    return (result as MemberRecord | undefined) ?? null
  }

  public async findByOrganizationSlug(orgSlug: string): Promise<MemberRecord[]> {
    const result = await this.collection.query
      .equal('orgSlug', orgSlug)
      .build()
    return result as MemberRecord[]
  }

  public async findByUserId(userId: string): Promise<MemberRecord[]> {
    const result = await this.collection.query
      .equal('userId', userId)
      .build()
    return result as MemberRecord[]
  }

  public async create(record: Omit<MemberRecord, 'id' | 'joinedAt'>): Promise<string> {
    const id = await this.collection.create({
      ...record,
      email: normalizeEmail(record.email),
      joinedAt: getCurrentTimestamp(),
    })
    return id
  }

  public async delete(id: string): Promise<void> {
    await this.collection.delete(id)
  }
}

