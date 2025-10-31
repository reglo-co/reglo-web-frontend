'use client'

import { useClerk, useUser } from '@clerk/nextjs'
import Link from 'next/link'

import {
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Settings,
  User,
} from 'lucide-react'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/modules/common/ui/primitives/avatar'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/modules/common/ui/primitives/dropdown-menu'

import { ThemeSwitcher } from '@/modules/common/ui'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/modules/common/ui/primitives'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/modules/common/ui/primitives/sidebar'
import { useState } from 'react'

export function NavUser() {
  const [configModal, setConfigModal] = useState(false)
  const { user } = useUser()
  const { signOut } = useClerk()
  const { isMobile } = useSidebar()

  const name = user?.fullName ?? ''
  const email = user?.emailAddresses[0].emailAddress ?? ''
  const avatar = user?.imageUrl ?? ''
  const side = isMobile ? 'bottom' : 'right'

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-full">
                  <AvatarImage src={avatar} alt={name} />
                  <AvatarFallback className="rounded-full">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{name}</span>
                  <span className="truncate text-xs">{email}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              side={side}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-full">
                    <AvatarImage src={avatar} alt={name} />
                    <AvatarFallback className="rounded-full">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{name}</span>
                    <span className="truncate text-xs">{email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <Link href="/profile">
                  <DropdownMenuItem>
                    <User />
                    Minha conta
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem onClick={() => setConfigModal(true)}>
                  <Settings />
                  Configurações
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard />
                  Pagamentos
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => signOut({ redirectUrl: '/sign-in' })}
              >
                <LogOut />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>

      <Dialog open={configModal} onOpenChange={setConfigModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Configurações</DialogTitle>
          </DialogHeader>
          <DialogDescription asChild>
            <div className="flex w-full flex-row items-center justify-between gap-2">
              <span className="type-small">Tema da aplicação</span>
              <ThemeSwitcher />
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  )
}
