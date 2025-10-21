import { cn } from '@common/lib/utils'
import { KanbanData } from '../../types'
import { KanbanColumn } from '../kanban-column'

interface KanbanBoardProps {
  data: KanbanData
  className?: string
}

export function KanbanBoard({ data, className }: KanbanBoardProps) {
  return (
    <div className={cn('w-full', className)}>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {data.columns.map((column) => (
          <KanbanColumn key={column.id} column={column} />
        ))}
      </div>
    </div>
  )
}
