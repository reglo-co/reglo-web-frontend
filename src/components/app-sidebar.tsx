import { NavMain } from '@/components/nav-main'
import { NavProjects } from '@/components/nav-projects'
import { NavUser } from '@/modules/user/components'
import { getUserMinimalAction } from '@/modules/user/actions/get-user-minimal'
import { TeamSwitch } from '@/modules/tenant/components'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'

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
        <TeamSwitch />
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
        <NavProjects />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
