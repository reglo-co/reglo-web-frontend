'use client'

import { listMyOrganizationsService } from '@/modules/organizations/services'
import { useQuery } from '@tanstack/react-query'

export function useListMyOrganizations() {
  const response = useQuery({
    queryKey: ['list-my-organizations'],
    queryFn: async () => {
      const result = await listMyOrganizationsService()
      return result
    },
  })

  return {
    list: response.data?.list || [],
    total: response.data?.total || 0,
    isLoading: response.isLoading,
    isSuccess: response.isSuccess,
    isFetching: response.isFetching,
    isFetched: response.isFetched,
    isError: response.isError,
    error: response.error,
  }
}
