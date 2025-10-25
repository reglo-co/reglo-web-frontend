'use client'

import { useWorkspaceModalStore } from '@/modules/workspaces/store'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
  CreateWorkspaceData,
  createWorkspace,
} from '@/modules/workspaces/services'

export function useWorkspaceCreate() {
  const { name, plan, collaborators, slug } = useWorkspaceModalStore()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (data: CreateWorkspaceData) => {
      const result = await createWorkspace(data)
      if (result.ok) {
        return result.data
      }
      throw result.error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-workspace-list'] })
      queryClient.invalidateQueries({ queryKey: ['user-plan-availables'] })
    },
  })

  const createWorkspaceHandler = () => {
    if (!plan) {
      throw new Error('Plan is required')
    }

    const data: CreateWorkspaceData = {
      name,
      slug,
      plan,
      collaborators: collaborators.map((collaborator) => ({
        email: collaborator.email,
        role: collaborator.permission,
      })),
    }

    return mutation.mutateAsync(data)
  }

  return {
    createWorkspace: createWorkspaceHandler,
    isLoading: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  }
}
