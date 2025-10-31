import { InfoCard } from '@common/components'
import { LogoRegloSymbol } from '@common/components/icons'
import { Briefcase, DollarSign, Users } from 'lucide-react'

type PlanCardSelectProps = {
  name: string
  users: number
  price: number
  workspaceLimit: number
  quantity: number
  isSelected: boolean
  onClick: () => void
  disabled?: boolean
}

export function PlanCardSelect({
  name,
  users,
  price,
  workspaceLimit,
  quantity,
  isSelected,
  onClick,
  disabled = false,
}: PlanCardSelectProps) {
  const priceFormatted = price
    ? price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })
    : 'Grátis'

  return (
    <InfoCard
      title={name.toUpperCase()}
      type="select"
      active={isSelected}
      cursor="pointer"
      iconLeftTop={
        quantity !== 999 ? (
          <span className="bg-rg-primary rg-transition flex size-5 items-center justify-center rounded-full text-xs font-bold text-white">
            {quantity}
          </span>
        ) : null
      }
      iconLeftBottom={
        <LogoRegloSymbol
          className="text-rg-gray-3 group-data-[active=true]/info-card:text-rg-primary"
          width={20}
          height={20}
        />
      }
      onClick={onClick}
      disabled={disabled}
    >
      <span className="text-rg-label-support flex items-center gap-2 text-xs">
        <DollarSign className="size-3" />
        {priceFormatted}
      </span>
      <span className="text-rg-label-support flex items-center gap-2 text-xs">
        <Briefcase className="size-3" />
        {workspaceLimit}
      </span>
      <span className="text-rg-label-support flex items-center gap-2 text-xs">
        <Users className="size-3" />
        {users}
      </span>
    </InfoCard>
  )
}
