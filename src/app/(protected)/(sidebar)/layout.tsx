import { AppSidebar } from '@ui/app-sidebar/app-sidebar'
import { PropsWithChildren } from 'react'

import {
  SidebarInset,
  SidebarProvider,
} from '@ui/primitives/sidebar'

export default function Page({ children }: PropsWithChildren) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  )
}
