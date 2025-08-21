'use client'

import Link from 'next/link'

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'

export function NavigationHome() {
  return (
    <NavigationMenu className="flex w-full" viewport={false}>
      <NavigationMenuList className="flex w-full justify-center gap-6">
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={''}>
            <Link href="#inicio">Início</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild className={''}>
            <Link href="#planos">Planos</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild className={''}>
            <Link href="#sobre">Sobre</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
