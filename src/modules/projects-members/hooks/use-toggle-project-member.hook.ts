'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  addProjectMemberService,
  removeProjectMemberService,
} from '@projects-members/services'

export function useToggleProjectMember(
  organizationSlug: string,
  projectSlug: string
) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (params: { email: string; next: boolean }) => {
      const { email, next } = params
      if (next) {
        const result = await addProjectMemberService(organizationSlug, projectSlug, email)
        return result.getDataOrDefault(undefined)
      } else {
        const result = await removeProjectMemberService(organizationSlug, projectSlug, email)
        return result.getDataOrDefault(undefined)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['list-project-members', organizationSlug, projectSlug],
      })
    },
  })

  return mutation
}


