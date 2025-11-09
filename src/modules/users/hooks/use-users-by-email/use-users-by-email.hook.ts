import { useQuery } from '@tanstack/react-query'
import { getAuth0UsersByEmailService } from '@users/services/get-auth0-users-by-email.service'

export function useUsersByEmail(emails: string[]) {
  const ownerEmails = Array.from(new Set(emails.filter(Boolean)))

  const {
    data: users = [],
    isLoading,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ['auth0-users-by-email', ownerEmails],
    queryFn: async () => {
      const result = await getAuth0UsersByEmailService(ownerEmails)
      return result.getDataOrDefault([])
    },
    enabled: ownerEmails.length > 0,
  })

  return {
    users: users || [],
    isLoading,
    isFetching,
    isError,
    error,
  }
}
