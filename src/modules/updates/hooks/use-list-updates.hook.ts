'use client'

import { listUpdatesService } from '@updates/services/list-updates.service'
import { UpdateRecord } from '@updates/types/update.type'
import { useQuery } from '@tanstack/react-query'

export function useListUpdates(organizationSlug?: string) {
  const response = useQuery({
    queryKey: ['list-updates', organizationSlug],
    queryFn: async () => {
      const result = await listUpdatesService(organizationSlug!)
      return result.getDataOrThrow()
    },
    enabled: !!organizationSlug,
    gcTime: 0,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  })

  return {
    updates:
      ((response.data as UpdateRecord[]) || [])
        .slice()
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ),
    isLoading: response.isLoading,
    isSuccess: response.isSuccess,
    isFetching: response.isFetching,
    isFetched: response.isFetched,
    isError: response.isError,
    error: response.error,
  }
}


