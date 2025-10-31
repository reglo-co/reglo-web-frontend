import { VerifyInputStatus } from '@common/components'
import { useDebounce } from '@common/hooks'
import { getOrganizationsSlugAvailable } from '@organizations/services'
import { useOrganizationModalStore } from '@organizations/store'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export function useOrganizationSlugAvailable() {
  const { slug } = useOrganizationModalStore()
  const debouncedSlug = useDebounce(slug, 500)

  const { data, isLoading, error } = useQuery({
    queryKey: ['organization-slug-available', debouncedSlug],
    queryFn: async () => {
      const result = await getOrganizationsSlugAvailable(debouncedSlug)
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
