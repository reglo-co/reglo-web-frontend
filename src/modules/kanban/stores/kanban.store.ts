import { create } from 'zustand'
import { KanbanItem } from '../types'

type KanbanStore = {
  selectedItem: KanbanItem | null
  setSelectedItem: (item: KanbanItem | null) => void
}

export const useKanban = create<KanbanStore>((set) => ({
  selectedItem: null,
  setSelectedItem: (item) => set({ selectedItem: item }),
}))
