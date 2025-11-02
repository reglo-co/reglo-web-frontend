import { NavUserAvatar, NavUserDropdown } from '@/modules/common/ui'
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/modules/common/ui/primitives'
import { Logo } from '../logo'

export function HeaderConsole() {
  return (
    <header className="header-height z-10 container mx-auto flex items-center justify-between px-6">
      <Logo.Symbol className="size-6" />

      <div data-ui="user-button">
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer">
            <NavUserAvatar />
          </DropdownMenuTrigger>
          <NavUserDropdown side="right" align="start" />
        </DropdownMenu>
      </div>
    </header>
  )
}
