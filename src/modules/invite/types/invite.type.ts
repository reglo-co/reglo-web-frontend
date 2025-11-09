export type InviteStatus = 'pending' | 'accepted' | 'cancelled'

export type Invite = {
  id: string
  orgId: string
  orgSlug: string
  orgName: string
  email: string
  status: InviteStatus
  createdAt: string
}
