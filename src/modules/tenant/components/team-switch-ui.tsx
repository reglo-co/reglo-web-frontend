'use client'

import Image from 'next/image'
import { ChevronsUpDown, Plus } from 'lucide-react'
import { LinkWithLoading } from '@/modules/common/components/navigation/link-with-loading'
import type { ProjectMinimal } from '@/modules/project/typings'
import { useTenant } from '@/modules/common/hook/useTenant'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { getTenantUrl } from '../helpers'

export function TeamSwitchUi({ teams }: { teams: ProjectMinimal[] }) {
  const { tenant } = useTenant()
  const { isMobile } = useSidebar()

  const activeTeam = teams.find((team) => team.slug === tenant)

  if (!activeTeam) {
    return null
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground h-12"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <Image
                  src={activeTeam.avatar}
                  alt={activeTeam.name}
                  width={32}
                  height={32}
                  className="rounded-lg"
                />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{activeTeam.name}</span>
                <span className="truncate text-xs">{activeTeam.plan}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Projetos
            </DropdownMenuLabel>
            {teams.map((team, index) => (
              <DropdownMenuItem key={team.name} className="gap-2 p-2">
                <LinkWithLoading
                  href={getTenantUrl(team.slug, '/')}
                  className="flex w-full items-center gap-2"
                >
                  <div className="flex size-6 items-center justify-center rounded-md border">
                    <Image
                      src={team.avatar}
                      alt={team.name}
                      width={24}
                      height={24}
                      className="rounded-lg"
                    />
                  </div>
                  {team.name}
                  <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                </LinkWithLoading>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                <Plus className="size-4" />
              </div>
              <div className="text-muted-foreground font-medium">
                Adicionar projeto
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
