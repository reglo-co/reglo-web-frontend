'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { removeMemberService } from '@users/services/remove-member.service'

export function useRemoveMember(organizationSlug: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (variables: {
      memberId: string
      skipInvalidate?: boolean
    }) => removeMemberService(organizationSlug, variables.memberId),
    onSuccess: (_data, variables) => {
      if (!variables?.skipInvalidate) {
        queryClient.invalidateQueries({
          queryKey: ['list-organization-members', organizationSlug],
        })
      }
    },
  })
}
