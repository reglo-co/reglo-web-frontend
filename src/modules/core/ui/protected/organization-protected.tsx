import { userCanAccessOrganizationService } from '@organizations'
import { notFound } from 'next/navigation'
import { PropsWithChildren } from 'react'

export async function OrganizationProtected({
  children,
  organization,
}: PropsWithChildren & { organization: string }) {
  const hasOrgAccess = await userCanAccessOrganizationService(organization)
  if (!hasOrgAccess) {
    return notFound()
  }

  return children
}
