import { LogoRegloSymbol } from '@common/components/icons/logo-reglo-symbol'
import { Navigation } from '@common/components/navigation/index'
import { Card } from '@common/components/ui'
import { EllipsisVertical } from 'lucide-react'

type WorkspacesCardProps = {
  name: string
  href: string
}

export function WorkspacesCard({ name, href }: WorkspacesCardProps) {
  return (
    <Navigation.link href={href}>
      <Card className="group/workspace-card hover:border-rg-gray-5 rg-transition flex min-h-46 cursor-pointer flex-row border-2 border-transparent">
        <span className="line-clamp-3 max-h-25 w-full text-lg sm:text-xl sm:leading-9">
          {name}
        </span>
        <div className="flex w-4 flex-1 flex-col items-center justify-between">
          <EllipsisVertical className="group-hover/workspace-card:text-rg-gray-6 hover:text-rg-primary text-rg-gray-3 size-4" />
          <LogoRegloSymbol
            width={20}
            height={20}
            className="text-rg-gray-3 group-hover/workspace-card:text-rg-gray-6"
          />
        </div>
      </Card>
    </Navigation.link>
  )
}
