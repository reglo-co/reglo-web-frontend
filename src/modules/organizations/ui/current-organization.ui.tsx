'use client'

import { Logo } from '@core/ui'
import {
  Badge,
  ItemActions,
  ItemContent,
  ItemTitle,
} from '@ui/primitives'

import { Item, ItemMedia } from '@ui/primitives'
import { useOrganizationBySlug } from '@organizations/hooks'
import { usePathname } from 'next/navigation'

export function CurrentOrganization() {
  const pathname = usePathname()
  const slug = pathname.split('/')[1] || ''
  const { organization } = useOrganizationBySlug(slug)

  if (!organization) {
    return null
  }

  return (
    <Item
      size="sm"
      variant="outline"
      className="bg-popover min-w-54 items-center gap-2.5 px-3 py-2"
    >
      <ItemMedia>
        <Logo.Symbol className="size-2.5" />
      </ItemMedia>
      <ItemContent>
        <ItemTitle className="mt-0.5 line-clamp-1">
          {organization?.name}
        </ItemTitle>
      </ItemContent>
      <ItemActions className="scale-85">
        <Badge className="type-micro!">main</Badge>
      </ItemActions>
    </Item>
  )
}
