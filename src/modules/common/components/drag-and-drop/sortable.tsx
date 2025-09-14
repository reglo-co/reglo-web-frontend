'use client'

import type { HTMLAttributes, CSSProperties, ReactNode } from 'react'
import { DndContext } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { cn } from '@/lib/utils'

import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'

import {
  useSortableList,
  WithId,
} from '@/modules/common/components/drag-and-drop'

type RenderArgs<T> = {
  item: T
  isDragging: boolean
  handleProps: HTMLAttributes<HTMLElement>
  setNodeRef: (el: HTMLElement | null) => void
  style: CSSProperties
}

type Props<T extends WithId> = {
  items: T[]
  onChange: (next: T[]) => void
  renderItem: (args: RenderArgs<T>) => ReactNode
  className?: string
}

export default function SortableList<T extends WithId>({
  items,
  onChange,
  renderItem,
  className,
}: Props<T>) {
  const { sensors, onDragEnd, ids } = useSortableList(items, onChange)
  return (
    <DndContext sensors={sensors} onDragEnd={onDragEnd}>
      <SortableContext items={ids} strategy={verticalListSortingStrategy}>
        <ul className={cn('w-full', className)}>
          {items.map((i) => (
            <SortableRow<T> key={i.id} item={i} renderItem={renderItem} />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  )
}

type SortableRowProps<T extends WithId> = {
  item: T
  renderItem: (args: RenderArgs<T>) => ReactNode
}

function SortableRow<T extends WithId>({
  item,
  renderItem,
}: SortableRowProps<T>) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id })

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 9999 : 'auto',
    position: isDragging ? 'relative' : 'static',
  }

  const handleProps = { ...attributes, ...listeners }

  return (
    <li ref={setNodeRef} style={style} className="w-full">
      {renderItem({ item, isDragging, handleProps, setNodeRef, style })}
    </li>
  )
}
