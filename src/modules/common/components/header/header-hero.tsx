import { Logo, Navigation } from '@common/components'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import {
  Button,
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@common/components/ui'

export function HeaderHero() {
  return (
    <header
      data-slot="header"
      className="sticky top-0 z-50 flex h-[var(--header-height)] w-full justify-center bg-white"
    >
      <div className="rg-max-container rg-transition flex h-full items-center justify-between">
        <Link
          href="/"
          className="group/logo flex items-center hover:opacity-80"
        >
          <Logo.symbol
            width={28}
            height={28}
            className="rg-transition group-hover/logo:rotate-90"
          />
          <Logo.lettering width={84} height={24} />
        </Link>

        <nav className="hidden sm:flex">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink href="#start">Início</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#what-we-are">
                  O que é a Reglo?
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#features">
                  Recursos
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#features">
                  Nosso Kanban
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        <div>
          <Navigation.link href="/workspace">
            <Button variant="default" className="gap-3 !px-3" rounded>
              <Logo.symbol width={12} height={12} className="size-3.5" />
              Ir para workspace
              <ArrowRight className="-ml-1 size-4" />
            </Button>
          </Navigation.link>
        </div>
      </div>
    </header>
  )
}
