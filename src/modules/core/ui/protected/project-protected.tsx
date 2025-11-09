import { listMyProjectsByOrganizationService } from '@projects/services'
import { notFound } from 'next/navigation'
import { PropsWithChildren } from 'react'

export async function ProjectProtected({
  children,
  organization,
  project,
}: PropsWithChildren & { organization: string; project: string }) {
  const result = await listMyProjectsByOrganizationService(organization)
  const { list } = result.getDataOrDefault({ list: [], total: 0 })
  const hasProjectAccess = list.some((p) => p.slug === project)

  if (!hasProjectAccess) {
    return notFound()
  }

  return children
}
