'use client'

import { cn } from '@common/lib/utils'
import { PropsWithClassname } from '@common/types/common.types'
import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

type LinkOrganizationProps = PropsWithClassname & {
  href: string
  children: ReactNode
  hasOrganization?: boolean
  target?: string
} & Omit<LinkProps, 'href'>

export function LinkOrganization({
  href,
  children,
  hasOrganization = false,
  className,
  target,
  ...props
}: LinkOrganizationProps) {
  const pathname = usePathname()
  const match = pathname.match(/^\/organizations\/([^/]+)/)
  const slug = match ? match[1] : null

  const fullHref = slug
    ? href.startsWith('/')
      ? `/organizations/${slug}${href}`
      : `/organizations/${slug}/${href}`
    : href // caso não esteja dentro de uma organização

  return (
    <Link
      href={hasOrganization ? fullHref : href}
      className={cn('flex', className)}
      target={target}
      {...props}
    >
      {children}
    </Link>
  )
}
