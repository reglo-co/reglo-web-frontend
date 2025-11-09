'use client'

import { getProjectBySlugService } from '@projects/services'
import { useQuery } from '@tanstack/react-query'

export function useProjectBySlug(
  organizationSlug: string,
  projectSlug: string
) {
  const response = useQuery({
    queryKey: ['project-by-slug', organizationSlug, projectSlug],
    queryFn: async () => {
      const result = await getProjectBySlugService(
        organizationSlug!,
        projectSlug!
      )
      return result.getDataOrThrow()
    },
    enabled: !!organizationSlug && !!projectSlug,
    gcTime: 0,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  })

  return {
    project: response.data || null,
    isLoading: response.isLoading,
    isSuccess: response.isSuccess,
    isFetching: response.isFetching,
    isFetched: response.isFetched,
    isError: response.isError,
    error: response.error,
  }
}

