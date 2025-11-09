export type UpdateType =
  | 'organization_created'
  | 'member_added'
  | 'member_removed'
  | 'project_created'
  | 'project_deleted'

export interface UpdateRecord {
  id: string
  orgId?: string
  orgSlug: string
  projectSlug?: string | null
  type: UpdateType
  message: string
  actorId: string
  actorName: string
  createdAt: string
}


