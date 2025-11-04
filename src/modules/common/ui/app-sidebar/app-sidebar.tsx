'use client'

import { NavMain } from '@/modules/common/ui/nav-main/nav-main'
import { NavUser } from '@/modules/common/ui/nav-user/nav-user'
import { TeamSwitcher } from '@/modules/common/ui/team-switcher/team-switcher'
import * as React from 'react'

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

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
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
          <TeamSwitcher />
        </SidebarHeader>
        <SidebarContent>
          <NavMain title="" items={data.navMain} />
          <NavMain title="Minha organização" items={data.navOrganization} />
          <NavMain title="Meu projeto" items={data.navProject} />
        </SidebarContent>
        <SidebarFooter>
          <NavUser />
        </SidebarFooter>
      </Sidebar>
    </>
  )
}
