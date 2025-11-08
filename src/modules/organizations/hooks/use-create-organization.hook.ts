'use client'

import { Organization } from '@organizations/types'
import { createOrganizationService } from '@organizations/services'
import { useMutation } from '@tanstack/react-query'

export function useCreateOrganization() {
  const response = useMutation({
    mutationFn: async (organization: Pick<Organization, 'name' | 'slug'>) => {
      const result = await createOrganizationService(organization)
      return result.getDataOrThrow()
    },
  })

  return {
    createOrganization: response.mutate,
    data: response.data,
    isPending: response.isPending,
    isSuccess: response.isSuccess,
    isError: response.isError,
    error: response.error,
    reset: response.reset,
  }
}
