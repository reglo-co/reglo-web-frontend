'use client'

import { ChevronsUpDown } from 'lucide-react'
import { useState } from 'react'

import { DropdownMenu, DropdownMenuTrigger } from '@ui/primitives/dropdown-menu'

import { NavUserDropdown, NavUserHeader, ThemeSwitcher } from '@core/ui'
import { useMounted } from '@hooks/use-mounted'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@ui/primitives'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@ui/primitives/sidebar'
export function NavUser() {
  const [configModal, setConfigModal] = useState(false)
  const mounted = useMounted()
  const { isMobile } = useSidebar()

  const side = isMobile ? 'bottom' : 'right'

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          {mounted ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <NavUserHeader />
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <NavUserDropdown side={side} align="end" />
            </DropdownMenu>
          ) : (
            <SidebarMenuButton size="lg" disabled>
              <NavUserHeader />
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          )}
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
