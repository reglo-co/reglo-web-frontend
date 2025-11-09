'use client'

import { useQuery } from '@tanstack/react-query'
import { listMyPendingInvitesService } from '@invite/services'

export function useListMyPendingInvites() {
  const response = useQuery({
    queryKey: ['list-my-pending-invites'],
    queryFn: async () => listMyPendingInvitesService(),
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


