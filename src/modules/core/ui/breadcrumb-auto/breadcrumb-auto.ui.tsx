import { Fragment } from 'react'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@core/ui/primitives'

type BreadcrumbAutoProps = {
  breadcrumb: { title: string; url?: string }[]
}

export function BreadcrumbAuto({ breadcrumb }: BreadcrumbAutoProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumb.map((item, index) => (
          <Fragment key={item.title}>
            {index > 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem className="text-support">
              {breadcrumb.length === index + 1 || !item.url ? (
                <span className="text-foreground cursor-default text-xs!">
                  {item.title}
                </span>
              ) : (
                <BreadcrumbLink className="text-support" href={item.url}>
                  {item.title}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
