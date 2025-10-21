import { InfoCard, LogoRegloSymbol } from '@common/components'
import { useModal } from '@common/stores/modal.store'
import { useKanban } from '../../stores/kanban.store'
import { KanbanItem } from '../../types/kanban.types'

interface KanbanCardProps {
  item: KanbanItem
}

export function KanbanCard({ item }: KanbanCardProps) {
  const modal = useModal()
  const kanban = useKanban()

  function handleCardClick() {
    kanban.setSelectedItem(item)
    modal.open('kanban-item-details')
  }

  return (
    <InfoCard
      title={item.title}
      iconLeftBottom={<LogoRegloSymbol className="text-rg-gray-4" />}
      type="hover"
      cursor="pointer"
      onClick={handleCardClick}
      leading="small"
    >
      <div className="space-y-3">
        <p className="text-rg-gray-6 line-clamp-3 text-sm">
          {item.shortDescription}
        </p>

        <div className="flex items-center gap-2 pt-2 pb-1.5">
          <div className="bg-rg-gray-2 h-1 flex-1 rounded-full">
            <div
              className="bg-rg-primary h-1 rounded-full transition-all duration-300"
              style={{ width: `${item.progressPercentage}%` }}
            />
          </div>
        </div>
      </div>
    </InfoCard>
  )
}
