import { Card, CardContent } from '@/components/ui/card'
import { ReactNode, type PropsWithChildren } from 'react'
import Link from 'next/link'

type CardImageLinkProps = PropsWithChildren & {
  href: string
  image: ReactNode
  name: string
}

export function CardImageLink({
  href,
  image,
  name,
  children,
}: CardImageLinkProps) {
  return (
    <Link href={href} key={href} className="cursor-pointer">
      <Card className="hover:bg-muted flex h-20 flex-row items-center transition-colors">
        <CardContent className="flex w-full flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            {image}
            {name}
          </div>
          {children}
        </CardContent>
      </Card>
    </Link>
  )
}
