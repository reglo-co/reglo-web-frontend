'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { cancelInviteService } from '@invite/services'

export function useCancelInvite(organizationSlug: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (inviteId: string) =>
      cancelInviteService(organizationSlug, inviteId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['list-organization-members', organizationSlug],
      })
    },
  })
}


