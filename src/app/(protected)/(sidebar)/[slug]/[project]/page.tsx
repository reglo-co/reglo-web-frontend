import { PropsWithParams } from '@core/types'
import { listMyProjectsByOrganizationService } from '@projects/services'
import { userCanAccessOrganizationService } from '@organizations'
import { notFound } from 'next/navigation'

export default async function Page({
  params,
}: PropsWithParams<{ slug: string; project: string }>) {
  const { slug, project } = await params

  const hasOrgAccess = await userCanAccessOrganizationService(slug)
  if (!hasOrgAccess) {
    return notFound()
  }

  const { list } = await listMyProjectsByOrganizationService(slug)
  const hasProjectAccess = list.some((p) => p.slug === project)
  if (!hasProjectAccess) {
    return notFound()
  }

  return <div>ProjectPage</div>
}
