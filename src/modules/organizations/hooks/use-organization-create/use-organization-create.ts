'use client'

import { useOrganizationModalStore } from '@organizations/store'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
  CreateOrganizationData,
  createOrganization,
} from '@organizations/services'

export function useOrganizationCreate() {
  const { name, plan, collaborators, slug } = useOrganizationModalStore()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (data: CreateOrganizationData) => {
      const result = await createOrganization(data)
      if (result.ok) {
        return result.data
      }
      throw result.error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-organizations-list'] })
      queryClient.invalidateQueries({ queryKey: ['user-plan-availables'] })
    },
  })

  const createOrganizationHandler = () => {
    if (!plan) {
      throw new Error('Plan is required')
    }

    const data: CreateOrganizationData = {
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
    createOrganization: createOrganizationHandler,
    isLoading: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  }
}
