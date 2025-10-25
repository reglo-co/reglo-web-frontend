import { PlanTypes } from '@/modules/plans/types'
import { create } from 'zustand'

type WorkspaceModalStore = {
  name: string
  plan: PlanTypes | null
  setName: (name: string) => void
  togglePlan: (plan: PlanTypes) => void
  clear: () => void
}

export const useWorkspaceModalStore = create<WorkspaceModalStore>((set) => ({
  name: '',
  plan: null,
  setName: (name: string) => set({ name }),
  togglePlan: (plan: PlanTypes) => {
    set((state) => ({
      plan: state.plan === plan ? null : plan,
    }))
  },
  clear: () => set({ name: '', plan: null }),
}))
