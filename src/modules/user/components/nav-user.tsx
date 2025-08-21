'use client'

import Link from 'next/link'
import { LogOut } from 'lucide-react'
import type { UserMinimalProps } from '@/modules/user/typings'
import { NAV_USER_MENU_ITEMS } from '@/modules/user/constants'
import { COMMON_CONSTANTS } from '@/modules/common/const'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { UserAvatarInfo } from './user-avatar-info'

export function NavUser({ user }: UserMinimalProps) {
  const { isMobile } = useSidebar()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <UserAvatarInfo user={user} />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <UserAvatarInfo user={user} showChevronsUpDown={false} />
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {NAV_USER_MENU_ITEMS.map((item) => (
                <Link href={item.href} key={item.label}>
                  <DropdownMenuItem>
                    <item.icon />
                    {item.label}
                  </DropdownMenuItem>
                </Link>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <Link href={COMMON_CONSTANTS.LOGOUT_PATH}>
              <DropdownMenuItem>
                <LogOut />
                Sair
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
