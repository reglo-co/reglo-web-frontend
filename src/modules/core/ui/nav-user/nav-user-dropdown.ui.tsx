import { CreditCard, Home, LogOut, Settings, User } from 'lucide-react'
import Link from 'next/link'

import { useModal } from '@core/stores'
import { NavUserHeader } from '@core/ui'
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@ui/primitives'

interface NavUserDropdownProps {
  side: 'right' | 'left' | 'top' | 'bottom'
  align: 'start' | 'center' | 'end'
}

export function NavUserDropdown({ side, align }: NavUserDropdownProps) {
  const { open } = useModal()
  return (
    <DropdownMenuContent
      className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
      side={side}
      align={align}
      sideOffset={4}
    >
      <DropdownMenuLabel className="p-0 font-normal">
        <NavUserHeader />
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <Link href="/console">
          <DropdownMenuItem className="group hover:text-label-hover!">
            <Home className="group-hover:text-label-hover!" />
            <span className="type-gap-top-1 leading-none">Organizações</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem className="group hover:text-label-hover!">
          <User className="group-hover:text-label-hover!" />
          <span className="type-gap-top-1 leading-none">Minha conta</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="group hover:text-label-hover!"
          onClick={() => open('system-configuration')}
        >
          <Settings className="group-hover:text-label-hover!" />
          <span className="type-gap-top-1 leading-none">Configurações</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="group hover:text-label-hover!">
          <CreditCard className="group-hover:text-label-hover!" />
          <span className="type-gap-top-1 leading-none">Pagamentos</span>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <Link href="/auth/logout">
        <DropdownMenuItem className="group hover:text-label-hover!">
          <LogOut className="group-hover:text-label-hover!" />
          <span className="type-gap-top-1 leading-none">Sair</span>
        </DropdownMenuItem>
      </Link>
    </DropdownMenuContent>
  )
}
