'use client'

import { getPlanAvailables } from '@/modules/plans/services'
import { useQuery } from '@tanstack/react-query'

export function useUserPlanAvailables() {
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ['user-plan-availables'],
    queryFn: async () => {
      const result = await getPlanAvailables()
      if (result.ok) {
        return result.data
      }
      throw result.error
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos (anteriormente cacheTime)
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })

  return {
    list: data || [],
    total: data?.length || 0,
    isLoading: isLoading || isFetching,
    error,
  }
}
