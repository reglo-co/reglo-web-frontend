import { PropsWithParams, WithOrganization } from '@core/types'
import { AppSidebar, Logo } from '@core/ui'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@core/ui/primitives'
import { OrganizationProtected } from '@core/ui/protected'
import { PropsWithChildren } from 'react'

export default async function Layout({
  children,
  params,
}: PropsWithChildren & PropsWithParams<WithOrganization>) {
  const { organization } = await params

  return (
    <OrganizationProtected organization={organization}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="bg-background sticky top-0 z-20 flex w-full items-center justify-between gap-4 border-b px-4 py-3 md:hidden">
            <Logo.Symbol className="size-6" />
            <SidebarTrigger className="-ml-1" />
          </header>
          {children}
        </SidebarInset>
      </SidebarProvider>
    </OrganizationProtected>
  )
}
