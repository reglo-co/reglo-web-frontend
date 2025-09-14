import { SidebarTrigger } from '../../sidebar'
import { Separator } from '../../separator'
import { BreadcrumbList } from './BreadcrumbList'
import { BreadcrumbItem } from './BreadcrumbItem'
import { BreadcrumbLink } from './BreadcrumbLink'
import { BreadcrumbSeparator } from './BreadcrumbSeparator'
import { BreadcrumbPage } from './BreadcrumbPage'

export function Breadcrumb({ ...props }: React.ComponentProps<'nav'>) {
  return (
    <section
      data-name="breadcrumb"
      className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-white px-4"
    >
      <SidebarTrigger className="-ml-1" />
      <Separator
        orientation="vertical"
        className="mr-2 data-[orientation=vertical]:h-4"
      />
      <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props}>
        <BreadcrumbList>
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbLink href="#">Ecommerce</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="hidden md:block" />
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbLink href="#">Produto</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="hidden md:block" />
          <BreadcrumbItem>
            <BreadcrumbPage>Página de produto</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </nav>
    </section>
  )
}
