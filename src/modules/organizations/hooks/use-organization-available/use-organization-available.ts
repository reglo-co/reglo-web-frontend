'use client'

import { getOrganizationAvailable } from '@/modules/organizations/services'
import { OrganizationAvailable } from '@/modules/organizations/types'
import { useQuery } from '@tanstack/react-query'

export function useOrganizationAvailable() {
  const { data, isLoading, isFetching, error } = useQuery<
    OrganizationAvailable[]
  >({
    queryKey: ['user-organization-available'],
    queryFn: async () => {
      const result = await getOrganizationAvailable()
      if (result.ok) {
        return result.data
      }
      throw result.error
    },
    networkMode: 'always',
    gcTime: 0,
    staleTime: 0,
  })

  const list = data ?? []

  const remaining = list.reduce(
    (acc, available) => acc + available.organizationsRemaining,
    0
  )

  return {
    list: data || [],
    total: data?.length || 0,
    isLoading: isLoading || isFetching,
    remaining,
    error,
  }
}
