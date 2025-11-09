'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { inviteMembersService } from '@invite/services'

export function useInviteMembers(organizationSlug: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (emails: string[]) =>
      inviteMembersService(organizationSlug, emails),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['list-organization-members', organizationSlug],
      })
    },
  })
}


