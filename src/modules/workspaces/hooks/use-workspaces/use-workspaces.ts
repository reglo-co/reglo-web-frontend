'use client'

import { getUserWorkspaceList } from '@/modules/users/services'
import { useQuery } from '@tanstack/react-query'

export function useWorkspaces() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['user-workspace-list'],
    queryFn: async () => {
      const result = await getUserWorkspaceList()
      console.log('result', result)
      if (result.ok) {
        return result.data
      }
      throw result.error
    },
  })

  console.log('data', data)

  return {
    list: data || [],
    length: data?.length || 0,
    isLoading,
    error,
  }
}
