'use client'

import { useQuery } from '@tanstack/react-query'
import { listMyAvailablesOrganizationsService } from '@organizations/services/list-my-availables-organizations.service'

export function useListMyAvailablesOrganizations() {
  const response = useQuery({
    queryKey: ['list-my-organizations-availables'],
    queryFn: async () => {
      const result = await listMyAvailablesOrganizationsService()
      return result.getDataOrDefault({ list: [], total: 0 })
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


