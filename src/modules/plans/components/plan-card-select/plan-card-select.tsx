import { InfoCard } from '@common/components'
import { LogoRegloSymbol } from '@common/components/icons'
import { Users } from 'lucide-react'

type PlanCardSelectProps = {
  name: string
  users: number
  quantity: number
  isSelected: boolean
  onClick: () => void
}

export function PlanCardSelect({
  name,
  users,
  quantity,
  isSelected,
  onClick,
}: PlanCardSelectProps) {
  return (
    <InfoCard
      title={name.toUpperCase()}
      type="select"
      active={isSelected}
      cursor="pointer"
      iconLeftTop={
        <span className="bg-rg-primary rg-transition flex size-5 items-center justify-center rounded-full text-xs font-bold text-white">
          {quantity}
        </span>
      }
      iconLeftBottom={
        <LogoRegloSymbol
          className="text-rg-gray-3 group-data-[active=true]/info-card:text-rg-primary"
          width={20}
          height={20}
        />
      }
      onClick={onClick}
    >
      <span className="text-rg-label-support flex items-center gap-2 text-xs">
        <Users className="size-3" />
        {users}
      </span>
    </InfoCard>
  )
}
