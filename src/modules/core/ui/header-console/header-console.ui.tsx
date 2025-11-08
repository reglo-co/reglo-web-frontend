import { NavUserAvatar, NavUserDropdown, ThemeSwitcher } from '@core/ui'
import { DropdownMenu, DropdownMenuTrigger } from '@ui/primitives'
import { Logo } from '../logo'

export function HeaderConsole() {
  return (
    <header className="header-height z-10 container mx-auto flex items-center justify-between px-6">
      <Logo.Symbol className="size-6" />

      <div className="flex items-center gap-4" data-ui="user-button">
        <ThemeSwitcher />
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
