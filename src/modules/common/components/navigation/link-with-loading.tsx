import Link from 'next/link'
import { useGlobalLoading } from '@/modules/common/stores'
import type { PropsWithChildren } from 'react'

export type LinkWithLoadingProps = PropsWithChildren & {
  href: string
  className?: string
}

export function LinkWithLoading({
  children,
  href,
  className,
}: LinkWithLoadingProps) {
  const { start } = useGlobalLoading()

  return (
    <Link href={href} onClick={start} className={className}>
      {children}
    </Link>
  )
}
