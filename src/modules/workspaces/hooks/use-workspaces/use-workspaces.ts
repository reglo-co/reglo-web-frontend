'use client'

import { getUserWorkspaceList } from '@/modules/users/services'
import { useQuery } from '@tanstack/react-query'

export function useWorkspacesList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['user-workspace-list'],
    queryFn: async () => {
      const result = await getUserWorkspaceList()
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
