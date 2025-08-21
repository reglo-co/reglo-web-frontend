'use client'

import { useTenant } from '@/modules/common/hook/useTenant'
import { LinkWithLoading } from './link-with-loading'

export type LinkWithTenantProps = {
  children: React.ReactNode
  href: string
  className?: string
}

export function LinkWithTenant({
  children,
  href,
  className,
}: LinkWithTenantProps) {
  const { tenant } = useTenant()

  if (href.startsWith('/')) {
    href = href.slice(1)
  }

  return (
    <LinkWithLoading href={`/${tenant}/${href}`} className={className}>
      {children}
    </LinkWithLoading>
  )
}
