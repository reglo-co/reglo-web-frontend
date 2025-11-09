import { getOwnerEmail } from '@organizations/services/get-owner-email.service'
import { useQuery } from '@tanstack/react-query'

export function useOwnerEmail(organizationSlug: string) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['owner-email', organizationSlug],
    queryFn: async () => {
      const result = await getOwnerEmail(organizationSlug)
      return result
    },
    enabled: !!organizationSlug,
    gcTime: 0,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  })

  return {
    ownerEmail: data,
    isLoading,
    isError,
    error,
  }
}
