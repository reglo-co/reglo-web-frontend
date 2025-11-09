'use client'

import { listProjectMembersService } from '@projects-members/services'
import { useQuery } from '@tanstack/react-query'

export function useListProjectMembers(
  organizationSlug?: string,
  projectSlug?: string
) {
  const response = useQuery({
    queryKey: ['list-project-members', organizationSlug, projectSlug],
    queryFn: async () => {
      if (!organizationSlug || !projectSlug) {
        return {
          list: [],
          total: 0,
        }
      }
      return listProjectMembersService(organizationSlug, projectSlug)
    },
    enabled: !!organizationSlug && !!projectSlug,
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
