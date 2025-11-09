'use client'

import { acceptInviteService, rejectInviteService } from '@invite/services'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useRespondInvite() {
  const queryClient = useQueryClient()
  const accept = useMutation({
    mutationFn: async (inviteId: string) => {
      const result = await acceptInviteService(inviteId)
      return result.getDataOrDefault(false)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['list-my-pending-invites'] })
      queryClient.invalidateQueries({ queryKey: ['list-my-organizations'] })
      queryClient.invalidateQueries({
        queryKey: ['list-my-organizations-availables'],
      })
      queryClient.invalidateQueries({
        predicate: (q) =>
          Array.isArray(q.queryKey) &&
          q.queryKey[0] === 'list-organization-members',
      })
    },
  })
  const reject = useMutation({
    mutationFn: async (inviteId: string) => {
      const result = await rejectInviteService(inviteId)
      return result.getDataOrDefault(false)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['list-my-pending-invites'] })
    },
  })
  return { accept, reject }
}
