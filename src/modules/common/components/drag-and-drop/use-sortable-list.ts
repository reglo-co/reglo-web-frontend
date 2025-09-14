'use client'

import { useSensors, useSensor } from '@dnd-kit/core'
import { PointerSensor } from '@dnd-kit/core'
import { DragEndEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'

export type WithId = { id: string }

export function useSortableList<T extends WithId>(
  items: T[],
  onChange: (next: T[]) => void
) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
        delay: 0,
        tolerance: 5,
      },
    })
  )

  function onDragEnd(e: DragEndEvent) {
    const { active, over } = e
    if (!over || active.id === over.id) return

    const oldIndex = items.findIndex((i) => i.id === String(active.id))
    const newIndex = items.findIndex((i) => i.id === String(over.id))

    if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
      onChange(arrayMove(items, oldIndex, newIndex))
    }
  }

  const ids = items.map((i) => i.id)
  return { sensors, onDragEnd, ids }
}
