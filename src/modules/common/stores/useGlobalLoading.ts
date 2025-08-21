'use client'

import { create } from 'zustand'

type S = { loading: boolean; start: () => void; stop: () => void }

export const useGlobalLoading = create<S>((set) => ({
  loading: false,
  start: () => set({ loading: true }),
  stop: () => set({ loading: false }),
}))
