import { userCanAccessOrganizationService } from '@/modules/organizations/access'
import { useQuery } from '@tanstack/react-query'

export function useUserCanAccessOrganization(slug: string) {
  const response = useQuery({
    queryKey: ['user-can-access-organization', slug],
    queryFn: async () => {
      const result = await userCanAccessOrganizationService(slug!)
      return result
    },
    enabled: !!slug,
  })

  return {
    userCanAccessOrganization: response.data,
    isLoading: response.isLoading,
    isSuccess: response.isSuccess,
    isFetching: response.isFetching,
    isFetched: response.isFetched,
    isError: response.isError,
    error: response.error,
  }
}
