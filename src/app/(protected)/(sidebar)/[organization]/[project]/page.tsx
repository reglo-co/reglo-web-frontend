'use client'

import { useProjectBreadcrumb } from '@projects/hooks'
import { HeaderProject } from '@projects/ui'
import { Fragment } from 'react'

export default function Page() {
  const breadcrumb = useProjectBreadcrumb()

  return (
    <Fragment>
      <HeaderProject breadcrumb={breadcrumb} />

      <div className="flex flex-col gap-2">
        <div className="type-h4 font-bold tracking-wide">Project Page</div>
      </div>
    </Fragment>
  )
}
