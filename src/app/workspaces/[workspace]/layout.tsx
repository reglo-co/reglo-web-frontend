import { AppSidebar } from '@/components/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { protectWorkspace } from '@/modules/workspaces/actions'
import type { WorkspaceParams } from '@/typings'
import type { PropsWithChildren } from 'react'

export default async function Layout({
  children,
  params,
}: PropsWithChildren & WorkspaceParams) {
  await protectWorkspace(params)

  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen">
        <AppSidebar />
        <SidebarInset>{children}</SidebarInset>
      </div>
    </SidebarProvider>
  )
}
