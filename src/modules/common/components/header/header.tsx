import { Navigation } from '@common/components/navigation'
import Image from 'next/image'
import Link from 'next/link'

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@common/components/ui'

import { AvatarIcon } from '@common/components/avatar-icon/avatar-icon'
import {
  Bolt,
  CreditCard,
  LayoutGrid,
  LogOut,
  StretchHorizontal,
  UserRound,
} from 'lucide-react'

export function Header({ withoutMenu = false }: { withoutMenu?: boolean }) {
  return (
    <header
      data-slot="header"
      className="sticky top-0 z-50 flex h-[var(--header-height)] w-full justify-center bg-white"
    >
      <div className="rg-max-container flex h-full items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/workspace">
            <Image
              src="/logo-reglo-symbol.svg"
              alt="Reglo Logo"
              className="size-8 transition hover:rotate-90"
              width={32}
              height={32}
            />
          </Link>

          {!withoutMenu && (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="secondary" size="icon" rounded>
                  <LayoutGrid strokeWidth={1.75} />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-48"
                side="bottom"
                align="start"
                asChild
              >
                <Navigation.list.root>
                  <Navigation.list.item
                    href="/workspace"
                    icon={<StretchHorizontal className="size-4" />}
                  >
                    Meus projetos
                  </Navigation.list.item>
                  <Navigation.list.item
                    href="/settings"
                    icon={<Bolt className="size-4" />}
                    hasWorkspace
                  >
                    Configurações
                  </Navigation.list.item>
                </Navigation.list.root>
              </PopoverContent>
            </Popover>
          )}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <AvatarIcon src="https://github.com/shadcn.png" alt="Avatar" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" side="bottom" className="min-w-48">
            <DropdownMenuLabel className="flex items-center gap-2">
              Minha Conta
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Navigation.link
                href="/workspace/profile"
                className="flex items-center gap-2"
              >
                <UserRound className="size-4" />
                Meu Perfil
              </Navigation.link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Navigation.link
                href="/workspace/payments"
                className="flex items-center gap-2"
              >
                <CreditCard className="size-4" />
                Pagamentos
              </Navigation.link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Navigation.link
                href="/logout"
                className="flex items-center gap-2"
              >
                <LogOut className="size-4" />
                Sair
              </Navigation.link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
