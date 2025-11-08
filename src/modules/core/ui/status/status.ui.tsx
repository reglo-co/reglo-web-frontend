import { PropsWithClassname } from '@core/types'
import { cn } from '@lib/utils'
import { Loader } from 'lucide-react'

type StatusProps = {
  status: 'loading' | 'success' | 'error' | 'neutral'
}

export function Status({
  status,
  className,
}: StatusProps & PropsWithClassname) {
  return (
    <div className={cn('size-2.5', className)}>
      {status === 'loading' && <Loader className="size-2.5 animate-spin" />}
      {status === 'success' && (
        <div className="bg-success size-2.5 rounded-full" />
      )}
      {status === 'error' && (
        <div className="bg-destructive size-2.5 rounded-full" />
      )}
      {status === 'neutral' && (
        <div className="bg-foreground/30 size-2.5 rounded-full" />
      )}
    </div>
  )
}
