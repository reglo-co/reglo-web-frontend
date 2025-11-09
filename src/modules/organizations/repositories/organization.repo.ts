import { FirebaseCollection } from '@lib/firebase'
import { Organization } from '@organizations/types'
import { MemberRepository } from '@users/repositories/member.repo'

export type OrganizationMemberRecord = {
  email: string
  role: 'owner' | 'member'
  joinedAt: string
}

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

    const organizationsAsOwner = await collection.query
      .equal('slug', slug)
      .equal('ownerEmail', userEmail)
      .build()

    if (organizationsAsOwner.length > 0) {
      return true
    }

    const memberRepo = new MemberRepository()
    const members = await memberRepo.byOrganizationSlug(slug)
    const isMember = members.some((m) => m.email === userEmail)

    return isMember
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

  public async manyBySlug(slugs: string[]): Promise<Organization[]> {
    if (slugs.length === 0) {
      return []
    }
    const collection = new FirebaseCollection('organizations')
    const result = await collection.query.in('slug', slugs).build()
    return result as Organization[]
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

  public async members(slug: string): Promise<OrganizationMemberRecord[]> {
    const collection = new FirebaseCollection('organizations')
    const result = await collection.query.equal('slug', slug).build()

    if (result.length === 0) {
      return []
    }

    const organization = result[0] as Organization

    if (!organization.ownerEmail) {
      return []
    }

    return [
      {
        email: organization.ownerEmail,
        role: 'owner',
        joinedAt: organization.createdAt,
      },
    ]
  }
}
