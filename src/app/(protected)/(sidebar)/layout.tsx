import { AppSidebar } from '@/modules/common/ui/app-sidebar/app-sidebar'
import { PropsWithChildren } from 'react'

import {
  SidebarInset,
  SidebarProvider,
} from '@/modules/common/ui/primitives/sidebar'

export default function Page({ children }: PropsWithChildren) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  )
}
