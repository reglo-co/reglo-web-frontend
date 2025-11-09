'use client'
import { usePathname } from 'next/navigation'

export function usePathnameContext() {
  const pathname = usePathname()
  const pathnames = pathname.split('/').filter(Boolean)
  const organization = pathnames[0]
  const project = pathnames[1]

  return { organization, project }
}
