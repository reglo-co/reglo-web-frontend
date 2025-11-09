import { FirebaseCollection } from '@lib/firebase'
import { Organization } from '@organizations/types'
import { MemberRepository } from '@users/repositories/member.repo'
import { COLLECTION_NAMES, ROLE } from '@repositories/repository.constants'
import { getCurrentTimestamp, normalizeEmail } from '@repositories/repository.utils'

export type OrganizationMemberRecord = {
  email: string
  role: typeof ROLE.OWNER | typeof ROLE.MEMBER
  joinedAt: string
}

type FindAllCreatedByOwnerParams = {
  ownerEmail: string
}

export class MeOrganizationRepository {
  private readonly collection: FirebaseCollection

  constructor() {
    this.collection = new FirebaseCollection(COLLECTION_NAMES.ORGANIZATIONS)
  }

  public async findAllCreatedByOwner({
    ownerEmail,
  }: FindAllCreatedByOwnerParams): Promise<Organization[]> {
    const queryResult = await this.collection.query
      .equal('ownerEmail', normalizeEmail(ownerEmail))
      .build()

    return queryResult as Organization[]
  }

  public async userHasAccessToOrganization(
    organizationSlug: string, 
    userEmail: string
  ): Promise<boolean> {
    const isUserOwner = await this.isUserOwnerOfOrganization(organizationSlug, userEmail)
    
    if (isUserOwner) {
      return true
    }

    return await this.isUserMemberOfOrganization(organizationSlug, userEmail)
  }

  private async isUserOwnerOfOrganization(
    organizationSlug: string, 
    userEmail: string
  ): Promise<boolean> {
    const organizationsWhereUserIsOwner = await this.collection.query
      .equal('slug', organizationSlug)
      .equal('ownerEmail', normalizeEmail(userEmail))
      .build()

    return organizationsWhereUserIsOwner.length > 0
  }

  private async isUserMemberOfOrganization(
    organizationSlug: string, 
    userEmail: string
  ): Promise<boolean> {
    const memberRepository = new MemberRepository()
    const organizationMembers = await memberRepository.findByOrganizationSlug(organizationSlug)
    
    return organizationMembers.some(
      (member) => normalizeEmail(member.email) === normalizeEmail(userEmail)
    )
  }
}

export class OrganizationRepository {
  private readonly collection: FirebaseCollection
  public readonly me: MeOrganizationRepository

  constructor() {
    this.collection = new FirebaseCollection(COLLECTION_NAMES.ORGANIZATIONS)
    this.me = new MeOrganizationRepository()
  }

  public async findOneBySlug(organizationSlug: string): Promise<Organization | null> {
    const queryResult = await this.collection.query
      .equal('slug', organizationSlug)
      .build()

    return (queryResult[0] as Organization | undefined) ?? null
  }

  public async findManyBySlugs(organizationSlugs: string[]): Promise<Organization[]> {
    if (organizationSlugs.length === 0) {
      return []
    }

    const queryResult = await this.collection.query
      .in('slug', organizationSlugs)
      .build()

    return queryResult as Organization[]
  }

  public async create(
    organizationData: Omit<Organization, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<string> {
    const currentTimestamp = getCurrentTimestamp()

    const id = await this.collection.create({
      ...organizationData,
      ownerEmail: normalizeEmail(organizationData.ownerEmail),
      createdAt: currentTimestamp,
      updatedAt: currentTimestamp,
    })

    return id
  }

  public async isSlugAvailable(slug: string): Promise<boolean> {
    const existingOrganizations = await this.collection.query
      .equal('slug', slug)
      .build()

    return existingOrganizations.length === 0
  }

  public async findMembers(organizationSlug: string): Promise<OrganizationMemberRecord[]> {
    const organization = await this.findOneBySlug(organizationSlug)

    if (!organization?.ownerEmail) {
      return []
    }

    return [
      {
        email: organization.ownerEmail,
        role: ROLE.OWNER,
        joinedAt: organization.createdAt,
      },
    ]
  }

  public async findOwnerEmail(organizationSlug: string): Promise<string | null> {
    const organization = await this.findOneBySlug(organizationSlug)
    return organization?.ownerEmail ?? null
  }
}
