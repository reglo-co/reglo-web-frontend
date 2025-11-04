import { useDebounce } from '@/modules/common/hooks/use-debounce'
import { checkSlugAvailableService } from '@/modules/organizations/create-organization'
import { useQuery } from '@tanstack/react-query'

export function useSlugAvailable(slug: string) {
  const debouncedSlug = useDebounce(slug, 500)

  const response = useQuery({
    queryKey: ['slug-available', debouncedSlug],
    queryFn: async () => {
      const result = await checkSlugAvailableService(debouncedSlug!)
      return result.getDataOrThrow()
    },
    enabled: !!debouncedSlug,
    gcTime: 0,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  })

  return {
    isAvailable: response.data || false,
    isLoading: response.isLoading,
    isSuccess: response.isSuccess,
    isFetching: response.isFetching,
    isFetched: response.isFetched,
    isError: response.isError,
    error: response.error,
  }
}
