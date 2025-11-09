import { FirebaseCollection } from '@lib/firebase'

export type ProjectMemberRecord = {
  id: string
  orgSlug: string
  projectSlug: string
  email: string
  userId?: string
  joinedAt: string
}

export class ProjectMemberRepository {
  constructor() {}

  public async byProject(
    orgSlug: string,
    projectSlug: string
  ): Promise<ProjectMemberRecord[]> {
    const collection = new FirebaseCollection('projects_members')
    const result = await collection.query
      .equal('orgSlug', orgSlug)
      .equal('projectSlug', projectSlug)
      .build()
    return result as ProjectMemberRecord[]
  }

  public async byUserInOrganization(
    orgSlug: string,
    email: string
  ): Promise<ProjectMemberRecord[]> {
    const collection = new FirebaseCollection('projects_members')
    const result = await collection.query
      .equal('orgSlug', orgSlug)
      .equal('email', email.toLowerCase())
      .build()
    return result as ProjectMemberRecord[]
  }

  public async findByProjectAndEmail(
    orgSlug: string,
    projectSlug: string,
    email: string
  ): Promise<ProjectMemberRecord | null> {
    const collection = new FirebaseCollection('projects_members')
    const result = await collection.query
      .equal('orgSlug', orgSlug)
      .equal('projectSlug', projectSlug)
      .equal('email', email.toLowerCase())
      .build()
    return (result?.[0] as ProjectMemberRecord | undefined) ?? null
  }

  public async create(
    record: Omit<ProjectMemberRecord, 'id' | 'joinedAt'>
  ): Promise<string> {
    const collection = new FirebaseCollection('projects_members')
    const id = await collection.create({
      ...record,
      email: record.email.toLowerCase(),
      joinedAt: new Date().toUTCString(),
    })
    return id
  }

  public async delete(id: string) {
    const collection = new FirebaseCollection('projects_members')
    await collection.delete(id)
  }
}
