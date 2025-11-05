import { PropsWithParams } from '@/modules/common/types/common.types'
import { userCanAccessOrganizationService } from '@organizations'
import { notFound } from 'next/navigation'
import { Fragment } from 'react'

export default async function Page({
  params,
}: PropsWithParams<{ slug: string }>) {
  const { slug } = await params
  const hasAccess = await userCanAccessOrganizationService(slug)

  if (!hasAccess) {
    return notFound()
  }

  return (
    <Fragment>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="bg-muted aspect-video rounded-xl" />
          <div className="bg-muted aspect-video rounded-xl" />
          <div className="bg-muted aspect-video rounded-xl" />
        </div>
        <div className="bg-muted min-h-screen flex-1 rounded-xl md:min-h-min" />
      </div>
    </Fragment>
  )
}
