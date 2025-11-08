import { FirebaseCollection } from '@lib/firebase'
import { Project } from '@projects/types'

type MeAvailablesParams = {
  organizationSlug: string
  userEmail: string
}

export class MeProjectRepository {
  public async availablesByOrganization({
    organizationSlug,
    userEmail,
  }: MeAvailablesParams): Promise<Project[]> {
    const collection = new FirebaseCollection('projects')
    const result = await collection.query
      .equal('organizationSlug', organizationSlug)
      .equal('ownerEmail', userEmail)
      .build()

    if (result.length === 0) {
      return []
    }

    return result as Project[]
  }
}

export class ProjectRepository {
  public me: MeProjectRepository

  constructor() {
    this.me = new MeProjectRepository()
  }

  public async create(
    project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>
  ) {
    const collection = new FirebaseCollection('projects')

    try {
      await collection.create({
        ...project,
        createdAt: new Date().toUTCString(),
        updatedAt: new Date().toUTCString(),
      })

      return project.slug
    } catch (error) {
      console.error(`[ProjectRepository.create] ${error}`)
      return false
    }
  }

  public async slugAvailable(slug: string, organizationSlug: string) {
    const collection = new FirebaseCollection('projects')
    const result = await collection.query
      .equal('slug', slug)
      .equal('organizationSlug', organizationSlug)
      .build()

    return result.length === 0
  }
}
