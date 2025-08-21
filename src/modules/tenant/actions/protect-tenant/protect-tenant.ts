'use server'

import type { TenantParams } from '@/typings'
import { notFound } from 'next/navigation'
import { cookies } from 'next/headers'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL

async function tenantExistsValidation(tenant: string) {
  const tenant_exists_url = new URL(`/api/tenants/${tenant}/exists`, APP_URL)

  const result = await fetch(tenant_exists_url)

  const { exists } = await result.json()

  if (!exists) {
    notFound()
  }
}

async function tenantHasAccessValidation(tenant: string) {
  const cookieStore = await cookies()

  const tenant_has_access_url = new URL(
    `/api/tenants/${tenant}/has-access`,
    APP_URL
  )

  const result = await fetch(tenant_has_access_url, {
    method: 'GET',
    credentials: 'include',
    headers: {
      cookie: cookieStore.toString(),
    },
    cache: 'no-store',
  })

  const { hasAccess } = await result.json()

  if (!hasAccess) {
    notFound()
  }
}

export async function protectTenant(params: TenantParams['params']) {
  const { tenant } = await params

  await tenantExistsValidation(tenant.toLowerCase())
  await tenantHasAccessValidation(tenant.toLowerCase())

  return true
}
