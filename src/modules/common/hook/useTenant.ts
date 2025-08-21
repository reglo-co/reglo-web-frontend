'use client'

import { RESERVED_SUBDOMAINS } from '@/modules/middleware/wildcard-subdomain'
import { useEffect, useState } from 'react'

export function useTenant(): { tenant: string | null } {
  const [tenant, setTenant] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') {
      setTenant(null)
    } else {
      const tenant = window.location.hostname.split('.')[0]
      setTenant(tenant)
    }
  }, [])

  if (!tenant || RESERVED_SUBDOMAINS.has(tenant)) {
    return {
      tenant: null,
    }
  }

  return {
    tenant,
  }
}
