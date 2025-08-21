'use client'

import { RESERVED_SUBDOMAINS } from '@/modules/middleware/wildcard-subdomain'
import { useEffect, useState } from 'react'

export function useWorkspace(): { workspace: string | null } {
  const [workspace, setWorkspace] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') {
      setWorkspace(null)
    } else {
      const workspace = window.location.hostname.split('.')[0]
      setWorkspace(workspace)
    }
  }, [])

  if (!workspace || RESERVED_SUBDOMAINS.has(workspace)) {
    return {
      workspace: null,
    }
  }

  return {
    workspace,
  }
}
