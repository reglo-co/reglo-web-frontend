'use client'
import { usePathname } from 'next/navigation'

const ORGANIZATION_SEGMENT_INDEX = 0
const PROJECT_SEGMENT_INDEX = 1

function extractPathSegments(pathname: string): string[] {
  return pathname.split('/').filter(Boolean)
}

export function usePathnameContext() {
  const currentPathname = usePathname()
  const pathSegments = extractPathSegments(currentPathname)
  
  const organizationSlug = pathSegments[ORGANIZATION_SEGMENT_INDEX]
  const projectSlug = pathSegments[PROJECT_SEGMENT_INDEX]

  return { 
    organization: organizationSlug, 
    project: projectSlug 
  }
}
