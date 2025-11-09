'use client'

import { useModal } from '@core/stores'
import { Logo } from '@core/ui'
import { Skeleton } from '@core/ui/primitives'
import { useMounted } from '@hooks/use-mounted'
import {
  useCurrentOrganization,
  useListMyAvailablesOrganizations,
} from '@organizations'
import { ChevronsUpDown, Mailbox, Plus } from 'lucide-react'
import Link from 'next/link'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@ui/primitives/dropdown-menu'

import { useListOrganizationProjects } from '@projects/hooks'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@ui/primitives/sidebar'

export function TeamSwitcher() {
  const { open } = useModal()
  const organization = useCurrentOrganization()
  const { list: teams } = useListMyAvailablesOrganizations()
  const { list: projects } = useListOrganizationProjects(organization?.slug)
  const { isMobile } = useSidebar()
  const mounted = useMounted()

  if (!organization) {
    return <Skeleton className="h-10 w-full" />
  }

  if (!mounted) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" disabled>
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
              <Logo.Symbol className="size-4" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{organization.name}</span>
            </div>
            <ChevronsUpDown className="ml-auto" />
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    )
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground h-10 gap-2.5"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-6 items-center justify-center rounded-lg">
                <Logo.Symbol className="size-3" />
              </div>
              <span className="truncate pt-0.5 font-medium">
                {organization.name}
              </span>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 space-y-3 rounded-lg"
            align="start"
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-muted-foreground pb-2 text-xs">
                Meus projetos
              </DropdownMenuLabel>
              {projects.map((project) => (
                <Link
                  href={`/${organization.slug}/${project.slug}`}
                  key={project.slug}
                >
                  <DropdownMenuItem key={project.name} className="gap-2.5 p-2">
                    <Mailbox className="size-4" />
                    <span className="truncate pt-0.5 font-medium">
                      {project.name}
                    </span>
                  </DropdownMenuItem>
                </Link>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => open('create-project')}
                className="gap-2 p-2"
              >
                <Plus className="size-4" />
                <div className="font-medium">Criar Projeto</div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </DropdownMenuGroup>
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-muted-foreground pb-2 text-xs">
                Minhas organizações
              </DropdownMenuLabel>
              {teams.map((team) => (
                <Link href={`/${team.slug}`} key={team.slug}>
                  <DropdownMenuItem key={team.name} className="gap-2.5 p-2">
                    <Logo.Symbol className="size-3.5 shrink-0" />
                    <span className="truncate font-medium">{team.name}</span>
                  </DropdownMenuItem>
                </Link>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => open('create-organization')}
                className="gap-2 p-2"
              >
                <Plus className="size-4" />
                <div className="font-medium">Criar Organização</div>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
