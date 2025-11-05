import { ItemContent, ItemDescription } from '@/modules/common/ui/primitives'
import Link from 'next/link'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Item,
  ItemMedia,
  ItemTitle,
} from '@/modules/common/ui/primitives'

type ListOrganizationItemProps = {
  name: string
  slug: string
  avatarUrl?: string
}
export function ListOrganizationItem({
  name,
  slug,
  avatarUrl,
}: ListOrganizationItemProps) {
  const nameInitial = name.slice(0, 2).toUpperCase()

  return (
    <Link href={`/${slug}`}>
      <Item
        variant="outline"
        className="hover:bg-accent/50 bg-accent/20 transition-base h-20 cursor-pointer"
      >
        <ItemMedia>
          <Avatar className="mt-1 size-8">
            <AvatarImage src={avatarUrl} />
            <AvatarFallback>{nameInitial}</AvatarFallback>
          </Avatar>
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="type-base!">{name}</ItemTitle>
          <ItemDescription className="type-micro!">
            Última atualização há 2 dias
          </ItemDescription>
        </ItemContent>
      </Item>
    </Link>
  )
}
