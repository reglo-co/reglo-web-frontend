'use client'

import { PropsWithClassname } from '@common/types/common.types'
import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

type LinkWorkspaceProps = PropsWithClassname & {
  href: string
  children: ReactNode
  hasWorkspace?: boolean
} & Omit<LinkProps, 'href'>

export function LinkWorkspace({
  href,
  children,
  hasWorkspace = false,
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
    <Link href={hasWorkspace ? fullHref : href} {...props}>
      {children}
    </Link>
  )
}
