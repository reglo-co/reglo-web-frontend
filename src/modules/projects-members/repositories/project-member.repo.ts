import { FirebaseCollection } from '@lib/firebase'
import { COLLECTION_NAMES } from '@repositories/repository.constants'
import {
  getCurrentTimestamp,
  normalizeEmail,
} from '@repositories/repository.utils'

export type ProjectMemberRecord = {
  id: string
  orgSlug: string
  projectSlug: string
  email: string
  userId?: string
  joinedAt: string
}

export class ProjectMemberRepository {
  private readonly collection: FirebaseCollection

  constructor() {
    this.collection = new FirebaseCollection(COLLECTION_NAMES.PROJECT_MEMBERS)
  }

  public async findByProject(
    orgSlug: string,
    projectSlug: string
  ): Promise<ProjectMemberRecord[]> {
    const result = await this.collection.query
      .equal('orgSlug', orgSlug)
      .equal('projectSlug', projectSlug)
      .build()
    return result as ProjectMemberRecord[]
  }

  public async findByUserInOrganization(
    orgSlug: string,
    email: string
  ): Promise<ProjectMemberRecord[]> {
    const result = await this.collection.query
      .equal('orgSlug', orgSlug)
      .equal('email', normalizeEmail(email))
      .build()
    return result as ProjectMemberRecord[]
  }

  public async findByProjectAndEmail(
    orgSlug: string,
    projectSlug: string,
    email: string
  ): Promise<ProjectMemberRecord | null> {
    const result = await this.collection.query
      .equal('orgSlug', orgSlug)
      .equal('projectSlug', projectSlug)
      .equal('email', normalizeEmail(email))
      .build()
    return (result?.[0] as ProjectMemberRecord | undefined) ?? null
  }

  public async create(
    record: Omit<ProjectMemberRecord, 'id' | 'joinedAt'>
  ): Promise<string> {
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
