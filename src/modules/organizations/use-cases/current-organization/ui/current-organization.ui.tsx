'use client'

import { Logo } from '@/modules/common/ui'
import {
  Badge,
  ItemActions,
  ItemContent,
  ItemTitle,
} from '@/modules/common/ui/primitives'

import { Item, ItemMedia } from '@/modules/common/ui/primitives'
import { useOrganizationBySlug } from '@/modules/organizations/use-cases/current-organization'
import { usePathname } from 'next/navigation'

export function CurrentOrganization() {
  const pathname = usePathname()
  const slug = pathname.split('/')[1] || ''
  const { organization } = useOrganizationBySlug(slug)

  if (!organization) {
    return null
  }

  const isTypeMicro = organization.name.length > 10

  return (
    <Item
      size="sm"
      variant="outline"
      className="w-54! items-center gap-2.5 px-3 py-2"
    >
      <ItemMedia>
        <Logo.Symbol className="size-2.5" />
      </ItemMedia>
      <ItemContent>
        <ItemTitle
          data-micro={isTypeMicro}
          className="data-[micro=true]:type-micro! mt-0.5 line-clamp-1"
        >
          {organization?.name}
        </ItemTitle>
      </ItemContent>
      <ItemActions className="scale-75">
        <Badge className="type-micro!">main</Badge>
      </ItemActions>
    </Item>
  )
}
