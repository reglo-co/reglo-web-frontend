import { CurrentOrganization } from '@organizations'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  Separator,
} from '@ui/primitives'
import { Activity } from 'react'

type HeaderPageProps = {
  breadcrumb?: {
    title: string
    url?: string
  }[]
}

export function HeaderPage({ breadcrumb }: HeaderPageProps) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-4 px-4">
        <CurrentOrganization />
        <Separator
          orientation="vertical"
          className="data-[orientation=vertical]:h-4"
        />

        <Activity mode={breadcrumb ? 'visible' : 'hidden'}>
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumb?.map((item) => (
                <BreadcrumbItem key={item.title}>
                  {item.url ? (
                    <BreadcrumbLink href={item.url}>
                      {item.title}
                    </BreadcrumbLink>
                  ) : (
                    <span className="text-label font-normal">{item.title}</span>
                  )}
                </BreadcrumbItem>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </Activity>
      </div>
    </header>
  )
}
