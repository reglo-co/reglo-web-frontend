export interface Project {
  id: string
  name: string
  slug: string
  organizationSlug: string
  ownerEmail: string
  createdAt: string
  updatedAt: string
}

export type Member = {
  id: string
  name: string
  avatarUrl?: string
}

export type ProjectTable = Project & {
  members: Member[]
  rulesCount: number
}
