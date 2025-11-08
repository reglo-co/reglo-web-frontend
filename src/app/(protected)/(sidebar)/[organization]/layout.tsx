import { PropsWithParams, WithOrganization } from '@core/types'
import { AppSidebar } from '@core/ui'
import { SidebarInset, SidebarProvider } from '@core/ui/primitives'
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
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
    </OrganizationProtected>
  )
}
