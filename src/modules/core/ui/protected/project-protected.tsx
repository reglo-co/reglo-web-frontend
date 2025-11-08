import { listMyProjectsByOrganizationService } from '@projects/services'
import { notFound } from 'next/navigation'
import { PropsWithChildren } from 'react'

export async function ProjectProtected({
  children,
  project,
}: PropsWithChildren & { project: string }) {
  const { list } = await listMyProjectsByOrganizationService(project)
  const hasProjectAccess = list.some((p) => p.slug === project)
  if (!hasProjectAccess) {
    return notFound()
  }

  return children
}
