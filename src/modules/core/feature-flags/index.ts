import { useUser } from '@auth0/nextjs-auth0'
import { useCurrentOrganization, useOwnerEmail } from '@organizations'
import { useCurrentProject } from '@projects/hooks'

export type FeatureKey =
  | 'updates'
  | 'invites'
  | 'projects'
  | 'analytics'
  | 'adminPanel'
  | 'owner'
  | 'projectOwner'

export function useFeatureFlag(key: FeatureKey, context?: unknown): boolean {
  const { user } = useUser()
  const currentOrganization = useCurrentOrganization()
  const { ownerEmail } = useOwnerEmail(currentOrganization?.slug as string)
  const project = useCurrentProject()

  if (key === 'owner') {
    return user?.email === ownerEmail
  }

  if (key === 'projectOwner') {
    const projectOwner = project?.ownerEmail?.toLowerCase()
    const current = user?.email?.toLowerCase()
    return !!current && !!projectOwner && current === projectOwner
  }

  if (key === 'updates') {
    const hasOrg =
      !!context &&
      typeof context === 'object' &&
      'orgSlug' in (context as Record<string, unknown>) &&
      !!(context as { orgSlug?: string }).orgSlug

    return hasOrg
  }

  return true
}
