import { SortDirection } from '@tanstack/react-table'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { PropsWithChildren } from 'react'

type TableHeaderButtonProps = {
  onClick?: ((event: unknown) => void) | undefined
  dir: SortDirection | false
} & PropsWithChildren

export function TableHeaderButton({
  onClick,
  dir,
  children,
}: TableHeaderButtonProps) {
  return (
    <button
      data-has-onclick={!!onClick}
      className="group hover:bg-muted inline-flex h-7 items-center gap-2 rounded-md px-3 pt-0.5 text-base font-medium data-[has-onclick=false]:hover:cursor-default data-[has-onclick=false]:hover:bg-transparent"
      onClick={onClick}
    >
      <span>{children}</span>
      <span className="text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
        {dir === 'asc' ? (
          <ChevronUp strokeWidth={2.5} className="size-3.5" />
        ) : dir === 'desc' ? (
          <ChevronDown strokeWidth={2.5} className="size-3.5" />
        ) : (
          <div className="flex size-3.5 items-center justify-center">
            <div className="bg-muted-foreground/30 size-1.5 rounded-full" />
          </div>
        )}
      </span>
    </button>
  )
}
