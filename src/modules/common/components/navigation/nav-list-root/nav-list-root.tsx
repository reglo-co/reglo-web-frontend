import { cn } from '@common/lib/utils'
import { PropsWithClassname } from '@common/types/common.types'
import { PropsWithChildren } from 'react'

type NavListRootProps = PropsWithChildren & PropsWithClassname

export function NavListRoot({ children, className }: NavListRootProps) {
  return <nav className={cn('flex flex-col', className)}>{children}</nav>
}
