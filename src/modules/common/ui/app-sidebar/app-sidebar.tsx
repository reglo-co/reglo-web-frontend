'use client'

import {
  AudioWaveform,
  Box,
  Command,
  FileText,
  GalleryVerticalEnd,
  GitBranch,
  Inbox,
  SquareTerminal,
  Users,
} from 'lucide-react'
import * as React from 'react'

import { NavMain } from '@/modules/common/ui/nav-main/nav-main'
import { NavUser } from '@/modules/common/ui/nav-user/nav-user'
import { TeamSwitcher } from '@/modules/common/ui/team-switcher/team-switcher'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from '@/modules/common/ui/primitives'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/modules/common/ui/primitives/sidebar'

// This is sample data.
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
    {
      name: 'Evil Corp.',
      logo: Command,
      plan: 'Free',
    },
  ],

  navMain: [
    {
      title: 'Inbox',
      url: '/',
      icon: Inbox,
    },
  ],
  navOrganization: [
    {
      title: 'Projetos',
      url: '/',
      icon: SquareTerminal,
    },
    {
      title: 'Pessoas',
      url: '/',
      icon: Users,
    },
  ],
  navProject: [
    {
      title: 'Regras',
      url: '/',
      icon: Box,
    },
    {
      title: 'Equipe',
      url: '/',
      icon: Users,
    },
    {
      title: 'Revisões',
      url: '/',
      icon: FileText,
    },
    {
      title: 'Versões',
      url: '/',
      icon: GitBranch,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <>
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader className="flex flex-col items-center justify-between gap-2">
          <TeamSwitcher teams={data.teams} />
          <Item
            size="sm"
            variant="outline"
            className="w-full items-center gap-2"
          >
            <ItemMedia className="">
              <Avatar className="-mt-0.5 size-4">
                <AvatarImage src="https://github.com/evilrabbit.png" />
                <AvatarFallback>ER</AvatarFallback>
              </Avatar>
            </ItemMedia>
            <ItemContent>
              <ItemTitle className="type-small line-clamp-1">Lumon</ItemTitle>
            </ItemContent>
            <ItemActions>
              <Badge className="type-micro!">main</Badge>
            </ItemActions>
          </Item>
        </SidebarHeader>
        <SidebarContent>
          <NavMain title="" items={data.navMain} />
          <NavMain title="Minha organização" items={data.navOrganization} />
          <NavMain title="Meu projeto" items={data.navProject} />
        </SidebarContent>
        <SidebarFooter>
          <NavUser />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </>
  )
}
