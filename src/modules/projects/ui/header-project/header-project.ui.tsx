import { BreadcrumbAuto } from '@core/ui'
import { Separator } from '@core/ui/primitives'
import { CurrentProject } from '@projects/ui'
import { Fragment } from 'react'

type HeaderProjectProps = {
  breadcrumb?: {
    title?: string
    url?: string
  }[]
}

export function HeaderProject({ breadcrumb }: HeaderProjectProps) {
  return (
    <header className="border-border/50 flex items-center gap-4 border-b pb-4">
      <CurrentProject />
      {breadcrumb && (
        <Fragment>
          <Separator orientation="vertical" className="h-4!" />
          <BreadcrumbAuto
            breadcrumb={breadcrumb.map((item) => ({
              title: item.title ?? '',
              url: item.url,
            }))}
          />
        </Fragment>
      )}
    </header>
  )
}
