export type ProjectMember = {
  id: string
  email: string
  role: 'owner' | 'member'
  joinedAt: string
}

export type ProjectMembersResponse = {
  list: ProjectMember[]
  total: number
}


