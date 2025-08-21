'use client'

import {
  Boxes,
  ExternalLink,
  Folder,
  Frame,
  PieChart,
  Plus,
} from 'lucide-react'

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

const NAV_PROJECTS_ITEMS = [
  {
    name: 'Design Engineering',
    url: '#',
    icon: Frame,
  },
  {
    name: 'Sales & Marketing',
    url: '#',
    icon: PieChart,
  },
  {
    name: 'Travel',
    url: '#',
    icon: Map,
  },
]

export function NavProjects() {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Navegação</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <Folder strokeWidth={1} />
            <span>...</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
        {NAV_PROJECTS_ITEMS.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <a href={item.url}>
                <Boxes strokeWidth={1} />
                <span>{item.name}</span>
              </a>
            </SidebarMenuButton>
            <SidebarMenuAction showOnHover className="cursor-pointer">
              <ExternalLink strokeWidth={1} />
              <span className="sr-only">More</span>
            </SidebarMenuAction>
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem>
          <SidebarMenuButton>
            <Plus strokeWidth={1.5} />
            <span>Novo grupo</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}
