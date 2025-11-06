import { create } from 'zustand'

export type ModalType =
  | 'create-organization'
  | 'empty-create-organization'
  | 'kanban-item-details'
  | 'system-configuration'
  | 'create-project'

type ModalStore = {
  name: ModalType | null
  isOpen(modal: ModalType): boolean
  open(modal: ModalType): void
  toggle(modal: ModalType): void
  close(): void
}

export const useModal = create<ModalStore>((set, get) => ({
  name: null,
  open: (name) => set({ name }),
  close: () => set({ name: null }),
  toggle: (name) => set({ name: name === get().name ? null : name }),
  isOpen: (name) => name === get().name,
}))
