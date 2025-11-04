'use client'

import { getOrganizationBySlugService } from '@/modules/organizations/services'
import { useQuery } from '@tanstack/react-query'

export function useOrganizationBySlug(slug: string) {
  const response = useQuery({
    queryKey: ['organization-by-slug', slug],
    queryFn: async () => {
      const result = await getOrganizationBySlugService(slug!)
      return result.getDataOrThrow()
    },
    enabled: !!slug,
    gcTime: 0,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  })

  return {
    organization: response.data || null,
    isLoading: response.isLoading,
    isSuccess: response.isSuccess,
    isFetching: response.isFetching,
    isFetched: response.isFetched,
    isError: response.isError,
    error: response.error,
  }
}
