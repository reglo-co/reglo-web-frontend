import { FirebaseCollection } from '@/modules/common/lib/firebase'
import { Organization } from '@/modules/organizations/domain/types'

type MeAllParams = {
  ownerEmail: string
}

export class MeOrganizationRepository {
  public async createdAll({
    ownerEmail,
  }: MeAllParams): Promise<Organization[]> {
    const collection = new FirebaseCollection('organizations')
    const result = await collection.query
      .equal('ownerEmail', ownerEmail)
      .build()

    if (result.length === 0) {
      return []
    }

    return result as Organization[]
  }

  public async hasAccess(slug: string, userEmail: string) {
    const collection = new FirebaseCollection('organizations')

    const organizations = await collection.query
      .equal('slug', slug)
      .equal('ownerEmail', userEmail)
      .build()

    return organizations.length > 0
  }
}

export class OrganizationRepository {
  public me: MeOrganizationRepository

  constructor() {
    this.me = new MeOrganizationRepository()
  }

  public async oneBySlug(slug: string): Promise<Organization | null> {
    const collection = new FirebaseCollection('organizations')
    const result = await collection.query.equal('slug', slug).build()

    if (result.length === 0) {
      return null
    }

    return result[0] as Organization
  }

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

  public async slugAvailable(slug: string) {
    const collection = new FirebaseCollection('organizations')
    const result = await collection.query.equal('slug', slug).build()

    return result.length === 0
  }
}
