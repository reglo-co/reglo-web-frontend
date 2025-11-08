'use client'

import { NavMain } from '@ui/nav-main/nav-main'
import { NavUser } from '@ui/nav-user/nav-user'
import { TeamSwitcher } from '@ui/team-switcher/team-switcher'
import { usePathname } from 'next/navigation'
import * as React from 'react'

import {
  AudioWaveform,
  Box,
  Command,
  FileText,
  GalleryVerticalEnd,
  GitBranch,
  Inbox,
  Mailbox,
  Users,
} from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@ui/primitives/sidebar'

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
      url: '/projects',
      icon: Mailbox,
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
  const pathname = usePathname()
  const pathnames = pathname.split('/').filter(Boolean)

  const organizationSlug = pathnames[0]
  const projectSlug = pathnames[1]

  const hasReservedPathname = ['settings', 'peoples', 'projects'].includes(
    projectSlug
  )

  const isProject = pathnames.length >= 2 && !hasReservedPathname

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="flex flex-col items-center justify-between gap-2">
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent className="pt-4">
        <NavMain title="" urlPrefix={organizationSlug} items={data.navMain} />
        <NavMain
          title="Minha organização"
          urlPrefix={organizationSlug}
          items={data.navOrganization}
        />

        <React.Activity mode={isProject ? 'visible' : 'hidden'}>
          <NavMain title="Meu projeto" items={data.navProject} />
        </React.Activity>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
