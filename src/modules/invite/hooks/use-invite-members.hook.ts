'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { inviteMembersService } from '@invite/services'

export function useInviteMembers(organizationSlug: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (emails: string[]) => {
      const result = await inviteMembersService(organizationSlug, emails)
      return result.getDataOrDefault({ created: 0 })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['list-organization-members', organizationSlug],
      })
    },
  })
}


