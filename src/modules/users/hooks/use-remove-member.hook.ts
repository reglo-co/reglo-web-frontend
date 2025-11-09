'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { removeMemberService } from '@users/services/remove-member.service'

export function useRemoveMember(organizationSlug: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (variables: {
      memberId: string
      skipInvalidate?: boolean
    }) => {
      const result = await removeMemberService(organizationSlug, variables.memberId)
      return result.getDataOrDefault(false)
    },
    onSuccess: (_data, variables) => {
      if (!variables?.skipInvalidate) {
        queryClient.invalidateQueries({
          queryKey: ['list-organization-members', organizationSlug],
        })
      }
    },
  })
}
