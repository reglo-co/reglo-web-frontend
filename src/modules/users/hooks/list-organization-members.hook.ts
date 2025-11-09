'use client'

import { useQuery } from '@tanstack/react-query'
import { listOrganizationMembersService } from '@users/services'

export function useListOrganizationMembers(organizationSlug?: string) {
  const response = useQuery({
    queryKey: ['list-organization-members', organizationSlug],
    queryFn: async () => {
      if (!organizationSlug) {
        return {
          list: [],
          total: 0,
        }
      }
      return listOrganizationMembersService(organizationSlug)
    },
    enabled: !!organizationSlug,
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
