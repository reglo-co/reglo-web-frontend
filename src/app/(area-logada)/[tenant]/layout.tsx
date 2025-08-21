import { AppSidebar } from '@/components/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { protectTenant } from '@/modules/tenant/actions'
import type { TenantParams } from '@/typings'
import type { PropsWithChildren } from 'react'

export default async function Layout({
  children,
  params,
}: PropsWithChildren & TenantParams) {
  await protectTenant(params)

  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen">
        <AppSidebar />
        <SidebarInset>{children}</SidebarInset>
      </div>
    </SidebarProvider>
  )
}
