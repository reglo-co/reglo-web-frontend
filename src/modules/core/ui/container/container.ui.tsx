import { cn } from '@core/lib/utils'
import { PropsWithClassname } from '@core/types'
import { PropsWithChildren } from 'react'

export function Container({
  children,
  className,
}: PropsWithChildren & PropsWithClassname) {
  return (
    <div className="bg-background h-full w-full rounded-2xl py-2 pr-2">
      <div className="bg-background-muted border-border/50 flex h-full flex-col gap-10 rounded-2xl border">
        <div className={cn('flex h-full flex-col p-4', className)}>
          {children}
        </div>
      </div>
    </div>
  )
}
