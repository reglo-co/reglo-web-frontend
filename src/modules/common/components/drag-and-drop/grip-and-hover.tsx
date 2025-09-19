import { Button } from '@/components/ui/button'
import { GripVertical } from 'lucide-react'
import type { HTMLAttributes, PropsWithChildren } from 'react'

type Props = {
  isDragging: boolean
  handleProps: HTMLAttributes<HTMLElement>
} & PropsWithChildren

export function GripAndHover({ children, isDragging, handleProps }: Props) {
  return (
    <div
      data-is-dragging={isDragging}
      className="data-[is-dragging=true]:ring-opacity-50 group w-full rounded-md transition-all duration-200 data-[is-dragging=false]:opacity-100 data-[is-dragging=true]:relative data-[is-dragging=true]:z-[9999] data-[is-dragging=true]:opacity-90 data-[is-dragging=true]:shadow-lg data-[is-dragging=true]:ring-2 data-[is-dragging=true]:ring-black/50"
    >
      <div className="flex w-full items-center rounded-md border border-transparent bg-white">
        <Button
          variant="ghost"
          size="icon"
          className="hidden cursor-grab text-gray-300 opacity-0 group-hover:opacity-100 hover:bg-gray-100 hover:text-gray-500 active:cursor-grabbing md:block"
          {...handleProps}
        >
          <GripVertical className="h-5 w-5" />
        </Button>
        {children}
      </div>
    </div>
  )
}
