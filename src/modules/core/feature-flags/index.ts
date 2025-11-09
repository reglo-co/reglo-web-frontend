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

function normalizeEmail(email: string | undefined): string {
  return email?.toLowerCase() ?? ''
}

function isUserOrganizationOwner(
  userEmail: string | undefined,
  ownerEmail: string | undefined
): boolean {
  return userEmail === ownerEmail
}

function isUserProjectOwner(
  userEmail: string | undefined,
  projectOwnerEmail: string | undefined
): boolean {
  const normalizedUserEmail = normalizeEmail(userEmail)
  const normalizedProjectOwnerEmail = normalizeEmail(projectOwnerEmail)

  return (
    normalizedUserEmail !== '' &&
    normalizedProjectOwnerEmail !== '' &&
    normalizedUserEmail === normalizedProjectOwnerEmail
  )
}

function hasOrganizationContext(context: unknown): boolean {
  if (!context || typeof context !== 'object') {
    return false
  }

  const contextObject = context as Record<string, unknown>
  return (
    'orgSlug' in contextObject &&
    typeof contextObject.orgSlug === 'string' &&
    contextObject.orgSlug !== ''
  )
}

export function useFeatureFlag(key: FeatureKey, context?: unknown): boolean {
  const { user } = useUser()
  const currentOrganization = useCurrentOrganization()
  const { ownerEmail } = useOwnerEmail(currentOrganization?.slug as string)
  const currentProject = useCurrentProject()

  if (key === 'owner') {
    return isUserOrganizationOwner(user?.email, ownerEmail ?? undefined)
  }

  if (key === 'projectOwner') {
    return isUserProjectOwner(user?.email, currentProject?.ownerEmail)
  }

  if (key === 'updates') {
    return hasOrganizationContext(context)
  }

  return true
}
