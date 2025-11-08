import { cn } from '@lib/utils'
import { PropsWithClassname } from '@core/types'
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
        <div className="size-2.5 rounded-full bg-green-500" />
      )}
      {status === 'error' && (
        <div className="size-2.5 rounded-full bg-red-500" />
      )}
      {status === 'neutral' && (
        <div className="size-2.5 rounded-full bg-gray-300" />
      )}
    </div>
  )
}
