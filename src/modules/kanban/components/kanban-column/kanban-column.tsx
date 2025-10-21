import { cn } from '@common/lib/utils'
import { KanbanColumn as KanbanColumnType } from '../../types'
import { KanbanCard } from '../kanban-card'

interface KanbanColumnProps {
  column: KanbanColumnType
  className?: string
}

export function KanbanColumn({ column, className }: KanbanColumnProps) {
  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <div className="border-border border-b pb-3">
        <div className="flex items-center justify-between">
          <h3 className="text-foreground text-lg font-semibold">
            {column.title}
          </h3>
          <span className="bg-muted rounded-full px-2 py-1 text-xs font-medium">
            {column.items.length}
          </span>
        </div>
      </div>

      <div className="flex min-h-[400px] flex-col gap-3">
        {column.items.length === 0 ? (
          <div className="text-muted-foreground flex flex-1 items-center justify-center text-sm">
            Nenhum item
          </div>
        ) : (
          column.items.map((item) => <KanbanCard key={item.id} item={item} />)
        )}
      </div>
    </div>
  )
}
