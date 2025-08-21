'use client'

import { useWorkspace } from '@/modules/common/hook/useWorkspace'
import { LinkWithLoading } from './link-with-loading'

export type LinkWithWorkspaceProps = {
  children: React.ReactNode
  href: string
  className?: string
}

export function LinkWithWorkspace({
  children,
  href,
  className,
}: LinkWithWorkspaceProps) {
  const { workspace } = useWorkspace()

  if (href.startsWith('/')) {
    href = href.slice(1)
  }

  return (
    <LinkWithLoading href={`/${workspace}/${href}`} className={className}>
      {children}
    </LinkWithLoading>
  )
}
