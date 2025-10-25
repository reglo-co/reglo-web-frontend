import { Helper } from '@/modules/common/helpers'
import { PlanTypes } from '@/modules/plans/types'
import { create } from 'zustand'

export type Collaborator = {
  email: string
  permission: 'admin' | 'editor' | 'viewer'
}

type WorkspaceModalStore = {
  name: string
  slug: string
  plan: PlanTypes | null
  collaborators: Collaborator[]
  setName: (name: string) => void
  setSlug: (slug: string) => void
  togglePlan: (plan: PlanTypes) => void
  setCollaborators: (collaborators: Collaborator[]) => void
  addCollaborator: (collaborator: Collaborator) => void
  removeCollaborator: (index: number) => void
  updateCollaborator: (
    index: number,
    collaborator: Partial<Collaborator>
  ) => void
  clear: () => void
}

export const useWorkspaceModalStore = create<WorkspaceModalStore>((set) => ({
  name: '',
  slug: '',
  plan: null,
  collaborators: [],
  setName: (name: string) => {
    set((state) => {
      if (state.name !== name) {
        const slug = Helper.toSlug(name)
        return { name, slug }
      }
      return state
    })
  },
  setSlug: (slug: string) => {
    set((state) => {
      if (state.slug !== slug) {
        return { slug }
      }
      return state
    })
  },
  togglePlan: (plan: PlanTypes) => {
    set((state) => ({
      plan: state.plan === plan ? null : plan,
    }))
  },
  setCollaborators: (collaborators: Collaborator[]) => {
    set({ collaborators })
  },
  addCollaborator: (collaborator: Collaborator) => {
    set((state) => ({ collaborators: [...state.collaborators, collaborator] }))
  },
  removeCollaborator: (index: number) => {
    set((state) => ({
      collaborators: state.collaborators.filter((_, i) => i !== index),
    }))
  },
  updateCollaborator: (index: number, collaborator: Partial<Collaborator>) => {
    set((state) => ({
      collaborators: state.collaborators.map((c, i) =>
        i === index ? { ...c, ...collaborator } : c
      ),
    }))
  },
  clear: () => set({ name: '', slug: '', plan: null, collaborators: [] }),
}))
