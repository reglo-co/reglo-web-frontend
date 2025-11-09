export type FeatureKey =
  | 'updates'
  | 'invites'
  | 'projects'
  | 'analytics'
  | 'adminPanel'

type FeatureResult = {
  isEnabled: boolean
  reason?: string
}

export function useFeatureFlag(
  key: FeatureKey,
  context?: unknown
): FeatureResult {
  switch (key) {
    case 'updates': {
      const hasOrg =
        !!context &&
        typeof context === 'object' &&
        'orgSlug' in (context as Record<string, unknown>) &&
        !!(context as { orgSlug?: string }).orgSlug
      return {
        isEnabled: hasOrg,
        reason: hasOrg ? undefined : 'missing-organization-context',
      }
    }
    default:
      return { isEnabled: true }
  }
}


