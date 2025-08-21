'use server'

import type { TenantParams } from '@/typings'
import { notFound } from 'next/navigation'
import { api } from '@/lib/api'

async function tenantExistsValidation(tenant: string) {
  const result = await api(`/api/tenants/${tenant}/exists`)

  if (!result.exists) {
    notFound()
  }
}

async function tenantHasAccessValidation(tenant: string) {
  const result = await api(`/api/tenants/${tenant}/has-access`)

  if (!result.hasAccess) {
    notFound()
  }
}

export async function protectTenant(params: TenantParams['params']) {
  const { tenant } = await params

  await tenantExistsValidation(tenant.toLowerCase())
  await tenantHasAccessValidation(tenant.toLowerCase())

  return true
}
