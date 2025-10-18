import { Navigation } from '@common/components/navigation/index'
import Image from 'next/image'
import Link from 'next/link'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
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

import {
  Bolt,
  CreditCard,
  LayoutGrid,
  LogOut,
  StretchHorizontal,
  UserRound,
} from 'lucide-react'

export function Header() {
  return (
    <div>
      <header className="flex h-18 w-full justify-center">
        <div className="flex h-full w-full max-w-7xl items-center justify-between px-4">
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
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="rg-transition hover:cursor-pointer hover:opacity-80">
                <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
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
    </div>
  )
}
