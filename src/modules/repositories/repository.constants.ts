export const FIRESTORE_IN_LIMIT = 10

export const COLLECTION_NAMES = {
  PROJECTS: 'projects',
  ORGANIZATIONS: 'organizations',
  INVITES: 'invite',
  MEMBERS: 'members',
  PROJECT_MEMBERS: 'projects_members',
  UPDATES: 'updates',
} as const

export const INVITE_STATUS = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  CANCELLED: 'cancelled',
} as const

export const ROLE = {
  OWNER: 'owner',
  MEMBER: 'member',
} as const

