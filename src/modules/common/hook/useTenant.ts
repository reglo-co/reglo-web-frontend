import { usePathname } from 'next/navigation'

export function useTenant() {
  const pathname = usePathname()
  const slug = pathname.split('/')[1]
  return {
    tenant: slug,
  }
}
