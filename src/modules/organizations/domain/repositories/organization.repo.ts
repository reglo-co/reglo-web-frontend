import { FirebaseCollection } from '@/modules/common/lib/firebase'
import { Organization } from '@/modules/organizations/domain/types'

type MeAllParams = {
  userId: string
}

export class MeOrganizationRepository {
  public async createdAll({ userId }: MeAllParams): Promise<Organization[]> {
    const collection = new FirebaseCollection('organizations')
    const result = await collection.query.equal('ownerId', userId).build()

    if (result.length === 0) {
      return []
    }

    return result as Organization[]
  }
}

export class OrganizationRepository {
  public me: MeOrganizationRepository

  constructor() {
    this.me = new MeOrganizationRepository()
  }

  public async one(id: string) {}
  public async oneBySlug(slug: string) {}
  public async allByOwnerId(ownerId: string) {}
  public async create(
    organization: Omit<Organization, 'id' | 'createdAt' | 'updatedAt'>
  ) {
    const collection = new FirebaseCollection('organizations')

    try {
      const result = await collection.create({
        ...organization,
        createdAt: new Date().toUTCString(),
        updatedAt: new Date().toUTCString(),
      })

      return result
    } catch (error) {
      console.error(`[OrganizationRepository.create] ${error}`)
      return false
    }
  }
  public async update(
    id: string,
    data: Partial<Omit<Organization, 'id' | 'createdAt' | 'updatedAt'>>
  ) {}
  public async all() {}
  public async slugAvailable(slug: string) {
    const collection = new FirebaseCollection('organizations')
    const result = await collection.query.equal('slug', slug).build()

    return result.length === 0
  }
}
