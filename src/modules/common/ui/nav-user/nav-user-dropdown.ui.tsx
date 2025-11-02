import { CreditCard, LogOut, Settings, User } from 'lucide-react'
import Link from 'next/link'

import { NavUserHeader } from '@/modules/common/ui'
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/modules/common/ui/primitives'

interface NavUserDropdownProps {
  side: 'right' | 'left' | 'top' | 'bottom'
  align: 'start' | 'center' | 'end'
}

export function NavUserDropdown({ side, align }: NavUserDropdownProps) {
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
        <DropdownMenuItem>
          <User />
          <span className="type-gap-top-1 leading-none">Minha conta</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => null}>
          <Settings />
          <span className="type-gap-top-1 leading-none">Configurações</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CreditCard />
          <span className="type-gap-top-1 leading-none">Pagamentos</span>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <Link href="/auth/logout">
        <DropdownMenuItem>
          <LogOut />
          <span className="type-gap-top-1 leading-none">Sair</span>
        </DropdownMenuItem>
      </Link>
    </DropdownMenuContent>
  )
}
