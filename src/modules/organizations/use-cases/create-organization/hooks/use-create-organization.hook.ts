import { Organization } from '@/modules/organizations/domain/types'
import { createOrganizationService } from '@/modules/organizations/use-cases/create-organization'
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
