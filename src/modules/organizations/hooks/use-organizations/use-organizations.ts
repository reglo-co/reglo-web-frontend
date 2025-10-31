'use client'

import { getUserOrganizationList } from '@/modules/users/services'
import { useQuery } from '@tanstack/react-query'

export function useOrganizationsList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['user-organizations-list'],
    queryFn: async () => {
      const result = await getUserOrganizationList()
      if (result.ok) {
        return result.data
      }
      throw result.error
    },
  })

  return {
    list: data || [],
    length: data?.length || 0,
    isLoading,
    error,
  }
}
