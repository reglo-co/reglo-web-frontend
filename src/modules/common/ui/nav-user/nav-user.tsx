'use client'

import { ChevronsUpDown } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/modules/common/ui/primitives/dropdown-menu'

import {
  NavUserDropdown,
  NavUserHeader,
  ThemeSwitcher,
} from '@/modules/common/ui'
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
  const { isMobile } = useSidebar()

  const name = '--teste--'
  const email = '--teste--'
  const avatar = '--teste--'
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
                <NavUserHeader />
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <NavUserDropdown side={side} align="end" />
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
