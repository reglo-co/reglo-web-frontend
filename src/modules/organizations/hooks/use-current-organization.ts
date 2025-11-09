'use client'

import { usePathnameContext } from '@core/hooks/use-pathname-context'
import { useOrganizationBySlug } from '@organizations/hooks/use-organization-by-slug.hook'

export function useCurrentOrganization() {
  const { organization: organizationSlug } = usePathnameContext()
  const { organization } = useOrganizationBySlug(organizationSlug)

  return organization
}
