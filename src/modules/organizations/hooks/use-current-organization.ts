'use client'

import { useOrganizationBySlug } from '@organizations/hooks/use-organization-by-slug.hook'
import { usePathname } from 'next/navigation'

export function useCurrentOrganization() {
  const pathname = usePathname()
  const pathnames = pathname.split('/').filter(Boolean)
  const organizationSlug = pathnames[0]
  const { organization } = useOrganizationBySlug(organizationSlug)

  return organization
}
