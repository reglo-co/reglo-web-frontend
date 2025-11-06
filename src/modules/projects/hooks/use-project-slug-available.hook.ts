'use client'

import { checkProjectSlugAvailableService } from '@/modules/projects/services'
import { useQuery } from '@tanstack/react-query'

export function useProjectSlugAvailable(
  organizationSlug: string | undefined,
  slug: string | undefined
) {
  const enabled = Boolean(organizationSlug && slug)

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['project-slug-available', organizationSlug, slug],
    queryFn: async () =>
      checkProjectSlugAvailableService(organizationSlug!, slug!),
    enabled,
    gcTime: 0,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  })

  return {
    isAvailable: data ?? false,
    isLoading,
    isFetching,
  }
}
