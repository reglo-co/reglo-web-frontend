import { usePathname } from 'next/navigation'

export function useWorkspacePath(path: string) {
  const pathname = usePathname()
  const workspace = pathname.split('/')[1]
  return `/${workspace}/${path}`
}
