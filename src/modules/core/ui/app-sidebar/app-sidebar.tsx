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
  Newspaper,
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
      url: '/people',
      icon: Users,
    },
    {
      title: 'Atualizações',
      url: '/updates',
      icon: Newspaper,
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
      url: '/teams',
      icon: Users,
    },
    {
      title: 'Revisões',
      url: '/reviews',
      icon: FileText,
    },
    {
      title: 'Versões',
      url: '/versions',
      icon: GitBranch,
    },
  ],
}

export function AppSidebar({
  side,
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const pathnames = pathname.split('/').filter(Boolean)

  const organizationSlug = pathnames[0]
  const projectSlug = pathnames[1]

  const hasReservedPathname = [
    'settings',
    'people',
    'projects',
    'updates',
  ].includes(projectSlug)

  const isProject = pathnames.length >= 2 && !hasReservedPathname

  return (
    <Sidebar collapsible="icon" side={side} {...props}>
      <SidebarHeader className="flex flex-col items-center justify-between gap-2">
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent className="pt-4">
        <NavMain title="" urlPrefix={organizationSlug} items={data.navMain} />
        <NavMain
          title="Organização"
          urlPrefix={organizationSlug}
          items={data.navOrganization}
        />

        <React.Activity mode={isProject ? 'visible' : 'hidden'}>
          <NavMain
            title="Projeto"
            urlPrefix={`${organizationSlug}/${projectSlug}`}
            items={data.navProject}
          />
        </React.Activity>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
