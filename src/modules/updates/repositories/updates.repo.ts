import { FirebaseCollection } from '@lib/firebase'
import { UpdateRecord, UpdateType } from '@updates/types/update.type'

export class UpdatesRepository {
  private readonly collection: FirebaseCollection

  constructor() {
    this.collection = new FirebaseCollection('updates')
  }

  public async create(
    data: Omit<UpdateRecord, 'id' | 'createdAt'>
  ): Promise<string> {
    const id = await this.collection.create({
      ...data,
      createdAt: new Date().toUTCString(),
    })
    return id
  }

  public async listByOrganizationSlug(orgSlug: string, limit = 50) {
    const result = await this.collection.query
      .equal('orgSlug', orgSlug)
      .limit(limit)
      .build()
    return result as UpdateRecord[]
  }
}


