import { cn } from '@common/lib/utils'
import { PropsWithClassname } from '@common/types/common.types'
import { PropsWithChildren, ReactNode } from 'react'
import { LinkWorkspace } from '../link-workspace/link-workspace'

type NavListItemProps = PropsWithChildren &
  PropsWithClassname & {
    href: string
    icon?: ReactNode
    iconClassName?: string
    hasWorkspace?: boolean
  }

export function NavListItem({
  href,
  children,
  className,
  icon,
  iconClassName,
  hasWorkspace = false,
}: NavListItemProps) {
  return (
    <LinkWorkspace
      href={href}
      hasWorkspace={hasWorkspace}
      className={cn(
        'group/link hover:bg-rg-gray-0 rg-transition flex h-12 items-center gap-3 rounded-md p-3',
        className
      )}
    >
      {icon && (
        <div
          className={cn(
            'text-rg-gray-6 group-hover/link:text-rg-primary rg-transition w-fit rounded-md',
            iconClassName
          )}
        >
          {icon}
        </div>
      )}

      <span className="text-rg-gray-6 group-hover/link:text-rg-primary text-base">
        {children}
      </span>
    </LinkWorkspace>
  )
}
