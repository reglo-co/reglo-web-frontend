import { InfoCard, LogoRegloSymbol, Navigation } from '@common/components'

type WorkspacesCardProps = {
  name: string
  href: string
}

export function WorkspacesCard({ name, href }: WorkspacesCardProps) {
  return (
    <Navigation.link href={href}>
      <InfoCard
        title={name}
        type="hover"
        cursor="pointer"
        iconLeftBottom={
          <LogoRegloSymbol className="text-rg-gray-3" width={20} height={20} />
        }
      />
    </Navigation.link>
  )
}
