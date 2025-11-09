import { FirebaseCollection } from '@lib/firebase'
import { UpdateRecord } from '@updates/types/update.type'
import { COLLECTION_NAMES } from '@repositories/repository.constants'
import { getCurrentTimestamp } from '@repositories/repository.utils'

const DEFAULT_LIMIT = 50

export class UpdatesRepository {
  private readonly collection: FirebaseCollection

  constructor() {
    this.collection = new FirebaseCollection(COLLECTION_NAMES.UPDATES)
  }

  public async create(
    data: Omit<UpdateRecord, 'id' | 'createdAt'>
  ): Promise<string> {
    const id = await this.collection.create({
      ...data,
      createdAt: getCurrentTimestamp(),
    })
    return id
  }

  public async findByOrganizationSlug(
    orgSlug: string, 
    limit: number = DEFAULT_LIMIT
  ): Promise<UpdateRecord[]> {
    const result = await this.collection.query
      .equal('orgSlug', orgSlug)
      .limit(limit)
      .build()
    return result as UpdateRecord[]
  }
}

