import { usePathname } from 'next/navigation'

export function useTenantPath(path: string) {
  const pathname = usePathname()
  const tenant = pathname.split('/')[1]
  return `/${tenant}/${path}`
}
