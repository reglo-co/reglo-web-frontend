'use client'

import { Home, ScrollText, Hash, Users } from 'lucide-react'
import { LinkWithWorkspace } from '@/modules/common/components'

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

const NAV_MAIN_ITEMS = [
  {
    title: 'Início',
    url: '/',
    icon: Home,
  },
  {
    title: 'Refinamentos',
    url: '/refinamentos',
    icon: ScrollText,
  },
  {
    title: 'Objetos',
    url: '/objetos',
    icon: Hash,
  },
  {
    title: 'Equipes',
    url: '/equipes',
    icon: Users,
  },
]

export function NavMain() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Plataforma</SidebarGroupLabel>
      <SidebarMenu>
        {NAV_MAIN_ITEMS.map((item) => (
          <LinkWithWorkspace href={item.url} key={item.title}>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip={item.title}>
                {item.icon && <item.icon strokeWidth={1.5} />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </LinkWithWorkspace>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
