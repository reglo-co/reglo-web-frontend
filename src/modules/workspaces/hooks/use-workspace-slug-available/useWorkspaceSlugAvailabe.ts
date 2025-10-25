import { VerifyInputStatus } from '@/modules/common/components'
import { useDebounce } from '@/modules/common/hooks'
import { getWorkspacesSlugAvailable } from '@/modules/workspaces/services'
import { useWorkspaceModalStore } from '@/modules/workspaces/store'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export function useWorkspaceSlugAvailable() {
  const { slug } = useWorkspaceModalStore()
  const debouncedSlug = useDebounce(slug, 500)

  const { data, isLoading, error } = useQuery({
    queryKey: ['workspace-slug-available', debouncedSlug],
    queryFn: async () => {
      const result = await getWorkspacesSlugAvailable(debouncedSlug)
      if (result.ok) {
        return result.data
      }
      throw result.error
    },
  })

  const available: VerifyInputStatus = useMemo(() => {
    if (!debouncedSlug) return 'neutral'
    if (isLoading) return 'loading'
    if (error) return 'invalid'
    return data?.available ? 'success' : 'invalid'
  }, [data?.available, isLoading, error, debouncedSlug])

  const isEmpty = !slug.trim()

  return {
    available: isEmpty ? 'neutral' : available,
    isLoading,
    error,
  }
}
