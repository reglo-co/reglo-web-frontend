'use client'

import { cn } from '@common/lib/utils'
import { PropsWithClassname } from '@common/types/common.types'
import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

type LinkWorkspaceProps = PropsWithClassname & {
  href: string
  children: ReactNode
  hasWorkspace?: boolean
  target?: string
} & Omit<LinkProps, 'href'>

export function LinkWorkspace({
  href,
  children,
  hasWorkspace = false,
  className,
  target,
  ...props
}: LinkWorkspaceProps) {
  const pathname = usePathname()
  const match = pathname.match(/^\/workspace\/([^/]+)/)
  const slug = match ? match[1] : null

  const fullHref = slug
    ? href.startsWith('/')
      ? `/workspace/${slug}${href}`
      : `/workspace/${slug}/${href}`
    : href // caso não esteja dentro de um workspace

  return (
    <Link
      href={hasWorkspace ? fullHref : href}
      className={cn('flex', className)}
      target={target}
      {...props}
    >
      {children}
    </Link>
  )
}
