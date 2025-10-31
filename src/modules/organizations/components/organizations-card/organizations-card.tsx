import { InfoCard, LogoRegloSymbol, Navigation } from '@common/components'

type OrganizationsCardProps = {
  name: string
  href: string
}

export function OrganizationsCard({ name, href }: OrganizationsCardProps) {
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
