import { LogoRegloSymbol } from '@common/components/icons'
import { Card, CardContent } from '@common/components/ui'
import { Cylinder, Users } from 'lucide-react'

type PlanCardSelectProps = {
  name: string
  users: number
  storage: number
  quantity: number
  isSelected: boolean
  onClick: () => void
}

export function PlanCardSelect({
  name,
  users,
  storage,
  quantity,
  isSelected,
  onClick,
}: PlanCardSelectProps) {
  return (
    <Card
      data-slot="plan-card-select"
      data-selected={isSelected}
      className="hover:border-rg-gray-3 group/plan-card-select data-[selected=true]:border-rg-primary rg-transition cursor-pointer border border-transparent"
      onClick={onClick}
    >
      <CardContent className="flex h-full min-h-32 p-0">
        <div className="flex h-full flex-1 flex-col gap-10">
          <span className="text-base leading-7 uppercase">{name}</span>
          <div className="flex flex-col gap-2">
            <span className="text-rg-label-support flex items-center gap-2 text-xs">
              <Users className="size-3" />
              {users}
            </span>
            <span className="text-rg-label-support flex items-center gap-2 text-xs">
              <Cylinder className="size-3" />
              {storage}MB
            </span>
          </div>
        </div>
        <div className="flex flex-1 flex-col items-end justify-between">
          <span className="bg-rg-primary flex size-5 items-center justify-center rounded-full text-xs font-bold text-white">
            {quantity}
          </span>
          <LogoRegloSymbol
            width={20}
            height={20}
            className="text-rg-gray-3 group-data-[selected=true]/plan-card-select:text-rg-primary"
          />
        </div>
      </CardContent>
    </Card>
  )
}
