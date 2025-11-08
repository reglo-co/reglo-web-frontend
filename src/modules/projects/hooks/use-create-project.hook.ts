'use client'

import { Project } from '@projects/types'
import { createProjectService } from '@projects/services'
import { useMutation } from '@tanstack/react-query'

export function useCreateProject() {
  const response = useMutation({
    mutationFn: async (
      project: Pick<Project, 'name' | 'slug' | 'organizationSlug'>
    ) => {
      const result = await createProjectService(project)
      return result.getDataOrThrow()
    },
  })

  return {
    createProject: response.mutate,
    data: response.data,
    isPending: response.isPending,
    isSuccess: response.isSuccess,
    isError: response.isError,
    error: response.error,
    reset: response.reset,
  }
}


