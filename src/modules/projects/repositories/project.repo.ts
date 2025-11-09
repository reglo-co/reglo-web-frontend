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
    const owned = await collection.query
      .equal('organizationSlug', organizationSlug)
      .equal('ownerEmail', userEmail)
      .build()

    // include projects where user is a member (projects_members)
    const { ProjectMemberRepository } = await import(
      '@projects-members/repositories'
    )
    const memberRepo = new ProjectMemberRepository()
    const memberships = await memberRepo.byUserInOrganization(
      organizationSlug,
      userEmail
    )
    const memberProjectSlugs = Array.from(
      new Set(memberships.map((m) => m.projectSlug))
    )

    let memberProjects: Project[] = []
    if (memberProjectSlugs.length > 0) {
      memberProjects = await this.manyBySlugs(organizationSlug, memberProjectSlugs)
    }

    const all = [...(owned as Project[]), ...memberProjects]
    const seen = new Set<string>()
    const deduped = all.filter((p) => {
      const key = `${p.organizationSlug}:${p.slug}`
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })

    return deduped
  }

  private async manyBySlugs(
    organizationSlug: string,
    slugs: string[]
  ): Promise<Project[]> {
    if (!slugs.length) return []
    const collection = new FirebaseCollection('projects')
    // Firestore 'in' supports up to 10 elements; if more, chunk
    const chunks: string[][] = []
    for (let i = 0; i < slugs.length; i += 10) {
      chunks.push(slugs.slice(i, i + 10))
    }
    const results: Project[] = []
    for (const chunk of chunks) {
      const res = (await collection.query
        .equal('organizationSlug', organizationSlug)
        .in('slug', chunk)
        .build()) as Project[]
      results.push(...res)
    }
    return results
  }
}

export class ProjectRepository {
  public me: MeProjectRepository

  constructor() {
    this.me = new MeProjectRepository()
  }

  public async oneBySlug(
    organizationSlug: string,
    slug: string
  ): Promise<Project | null> {
    const collection = new FirebaseCollection('projects')
    const result = await collection.query
      .equal('slug', slug)
      .equal('organizationSlug', organizationSlug)
      .build()

    if (result.length === 0) {
      return null
    }

    return result[0] as Project
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
