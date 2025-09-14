import { NavMain } from '@/components/nav-main'
import { NavUser } from '@/modules/user/components'
import { getUserMinimalAction } from '@/modules/user/actions/get-user-minimal'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'
import { WorkspaceSwitch } from '@/modules/workspaces/components'

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const user = await getUserMinimalAction()

  if (!user) {
    return null
  }

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <WorkspaceSwitch />
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
