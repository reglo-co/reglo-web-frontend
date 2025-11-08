'use client'

import { listMyProjectsByOrganizationService } from '@projects/services'
import { useQuery } from '@tanstack/react-query'

export function useListOrganizationProjects(organizationSlug: string) {
  const response = useQuery({
    queryKey: ['list-organization-projects', organizationSlug],
    queryFn: async () => {
      const result = await listMyProjectsByOrganizationService(organizationSlug!)
      return result
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


