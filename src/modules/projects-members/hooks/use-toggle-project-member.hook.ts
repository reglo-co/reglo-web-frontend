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
        await addProjectMemberService(organizationSlug, projectSlug, email)
      } else {
        await removeProjectMemberService(organizationSlug, projectSlug, email)
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


