'use client'

import { cn } from '@/modules/common/lib/utils'
import { Card, CardContent } from '@common/components'
import { cva } from 'class-variance-authority'
import { PropsWithChildren, ReactNode } from 'react'

const infoCardVariants = cva(
  'min-h-46 group/info-card p-3 rg-transition min-w-40 sm:p-6 border-2 border-transparent xs:max-w-56 w-full',
  {
    variants: {
      type: {
        hover: 'hover:border-rg-gray-3',
        select: 'data-[active=true]:border-rg-gray-6 hover:border-rg-gray-3',
        default: '',
      },
      cursor: {
        pointer: 'cursor-pointer',
        default: 'cursor-default',
      },
      disabled: {
        true: 'opacity-50 pointer-events-none',
        false: '',
      },
    },
  }
)

type InfoCardProps = PropsWithChildren & {
  title: string
  iconLeftTop?: ReactNode
  iconLeftBottom?: ReactNode
  type?: 'select' | 'hover' | 'default'
  active?: boolean
  cursor?: 'pointer' | 'default'
  leading?: 'default' | 'small'
  onClick?: () => void
  disabled?: boolean
}

export function InfoCard({
  title,
  iconLeftTop,
  iconLeftBottom,
  type = 'default',
  active = false,
  cursor = 'default',
  leading = 'default',
  children,
  onClick,
  disabled = false,
}: InfoCardProps) {
  const className = cn(infoCardVariants({ type, cursor, disabled }))

  return (
    <Card
      data-active={active}
      data-disabled={disabled}
      data-type={type}
      data-slot="info-card"
      className={className}
      onClick={disabled ? undefined : onClick}
    >
      <CardContent className="flex h-full w-full flex-row gap-1">
        <section
          data-section="info"
          className="flex h-full flex-1 flex-col justify-between gap-8"
        >
          <span
            className={cn(
              'line-clamp-3 max-h-20 flex-1 text-lg sm:max-h-26 sm:text-xl',
              leading === 'small'
                ? 'leading-6 sm:leading-7'
                : 'leading-7 sm:leading-9'
            )}
          >
            {title}
          </span>
          {children && <div className="flex flex-col gap-2">{children}</div>}
        </section>
        <section
          data-section="icons"
          className="flex h-full w-8 flex-col items-center justify-between sm:w-8"
        >
          <div className="flex size-6 items-start justify-end sm:size-8">
            {iconLeftTop}
          </div>
          <div className="flex size-6 items-end justify-end sm:size-8">
            {iconLeftBottom}
          </div>
        </section>
      </CardContent>
    </Card>
  )
}
