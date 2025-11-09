import { FirebaseCollection } from '@lib/firebase'
import { Project } from '@projects/types'
import { ProjectMemberRepository } from '@projects-members/repositories/project-member.repo'
import { COLLECTION_NAMES } from '@repositories/repository.constants'
import { 
  deduplicateByKey, 
  getCurrentTimestamp, 
  normalizeEmail, 
  queryInChunks 
} from '@repositories/repository.utils'

type AvailablesByOrganizationParams = {
  organizationSlug: string
  userEmail: string
}

export class MeProjectRepository {
  private readonly collection: FirebaseCollection

  constructor() {
    this.collection = new FirebaseCollection(COLLECTION_NAMES.PROJECTS)
  }

  public async availablesByOrganization({
    organizationSlug,
    userEmail,
  }: AvailablesByOrganizationParams): Promise<Project[]> {
    const normalizedEmail = normalizeEmail(userEmail)

    const ownedProjects = await this.collection.query
      .equal('organizationSlug', organizationSlug)
      .equal('ownerEmail', normalizedEmail)
      .build()

    const memberProjects = await this.findMemberProjects(organizationSlug, normalizedEmail)

    const allProjects = [...(ownedProjects as Project[]), ...memberProjects]
    
    return deduplicateByKey(allProjects, (project) => 
      `${project.organizationSlug}:${project.slug}`
    )
  }

  private async findMemberProjects(
    organizationSlug: string, 
    normalizedEmail: string
  ): Promise<Project[]> {
    const memberRepo = new ProjectMemberRepository()
    const memberships = await memberRepo.findByUserInOrganization(
      organizationSlug,
      normalizedEmail
    )

    const memberProjectSlugs = Array.from(
      new Set(memberships.map((membership) => membership.projectSlug))
    )

    if (memberProjectSlugs.length === 0) {
      return []
    }

    return await this.findManyBySlugs(organizationSlug, memberProjectSlugs)
  }

  private async findManyBySlugs(
    organizationSlug: string,
    slugs: string[]
  ): Promise<Project[]> {
    return await queryInChunks<Project>(
      this.collection,
      'slug',
      slugs,
      { organizationSlug }
    )
  }
}

export class ProjectRepository {
  private readonly collection: FirebaseCollection
  public readonly me: MeProjectRepository

  constructor() {
    this.collection = new FirebaseCollection(COLLECTION_NAMES.PROJECTS)
    this.me = new MeProjectRepository()
  }

  public async findOneBySlug(
    organizationSlug: string,
    projectSlug: string
  ): Promise<Project | null> {
    const queryResult = await this.collection.query
      .equal('slug', projectSlug)
      .equal('organizationSlug', organizationSlug)
      .build()

    return (queryResult[0] as Project | undefined) ?? null
  }

  public async create(
    projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<string> {
    const currentTimestamp = getCurrentTimestamp()

    const id = await this.collection.create({
      ...projectData,
      ownerEmail: normalizeEmail(projectData.ownerEmail),
      createdAt: currentTimestamp,
      updatedAt: currentTimestamp,
    })

    return id
  }

  public async isSlugAvailable(
    projectSlug: string, 
    organizationSlug: string
  ): Promise<boolean> {
    const existingProjects = await this.collection.query
      .equal('slug', projectSlug)
      .equal('organizationSlug', organizationSlug)
      .build()

    return existingProjects.length === 0
  }
}
