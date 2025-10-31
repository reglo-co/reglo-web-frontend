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

import { UserButton } from '@clerk/nextjs'
import {
  Bolt,
  CreditCard,
  LayoutGrid,
  Loader2,
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
          <Link href="/organizations">
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
                    href="/organizations"
                    icon={<StretchHorizontal className="size-4" />}
                  >
                    Minhas organizações
                  </Navigation.list.item>
                  <Navigation.list.item
                    href="/settings"
                    icon={<Bolt className="size-4" />}
                    hasOrganization
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
            <UserButton
              fallback={
                <Loader2
                  strokeWidth={1.75}
                  className="text-rg-gray-3 size-7 animate-spin"
                />
              }
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" side="bottom" className="min-w-48">
            <DropdownMenuLabel className="flex items-center gap-2">
              Minha Conta
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Navigation.link
                href="/organizations/profile"
                className="flex items-center gap-2"
              >
                <UserRound className="size-4" />
                Meu Perfil
              </Navigation.link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Navigation.link
                href="/organizations/payments"
                className="flex items-center gap-2"
              >
                <CreditCard className="size-4" />
                Pagamentos
              </Navigation.link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <Navigation.link
              href="/sign-out"
              className="flex w-full items-center gap-2"
            >
              <DropdownMenuItem className="w-full">
                <LogOut className="size-4" />
                Sair
              </DropdownMenuItem>
            </Navigation.link>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
