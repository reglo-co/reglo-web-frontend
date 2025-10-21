export interface KanbanItem {
  id: string
  title: string
  shortDescription: string
  detailedDescription: string
  reporters: string[]
  progressPercentage: number
  blockedDescription?: string
}

export interface KanbanColumn {
  id: string
  title: string
  items: KanbanItem[]
}

export interface KanbanData {
  columns: KanbanColumn[]
}
