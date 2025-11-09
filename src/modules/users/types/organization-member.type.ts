export type OrganizationMember = {
  id: string
  name: string
  email: string
  avatarUrl?: string | null
  role: 'owner' | 'member'
  joinedAt: string
}

export type OrganizationMembersResponse = {
  list: OrganizationMember[]
  total: number
}
