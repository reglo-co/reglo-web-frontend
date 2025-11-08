'use client'

import { cn } from '@lib/utils'
import { Button } from '@ui/primitives'
import { Moon, Sun } from 'lucide-react'
import { useCallback } from 'react'

import { Theme } from './theme-switcher.type'

type AnimationVariant = 'circle'
type StartPosition =
  | 'center'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'

const positions: Record<StartPosition, string> = {
  center: 'center',
  'top-left': 'top left',
  'top-right': 'top right',
  'bottom-left': 'bottom left',
  'bottom-right': 'bottom right',
}

function getCircleCoordinates(start: StartPosition) {
  const x =
    start === 'center'
      ? '50'
      : start.includes('left')
        ? '0'
        : start.includes('right')
          ? '100'
          : '50'
  const y =
    start === 'center'
      ? '50'
      : start.includes('top')
        ? '0'
        : start.includes('bottom')
          ? '100'
          : '50'
  return { x, y }
}

function getAnimationCss(variant: AnimationVariant, start: StartPosition) {
  if (variant === 'circle') {
    const { x, y } = getCircleCoordinates(start)
    return `
      @supports (view-transition-name: root) {
        ::view-transition-old(root) {
          animation: none;
        }
        ::view-transition-new(root) {
          animation: circle-expand 0.4s ease-out;
          transform-origin: ${positions[start]};
        }
        @keyframes circle-expand {
          from {
            clip-path: circle(0% at ${x}% ${y}%);
          }
          to {
            clip-path: circle(150% at ${x}% ${y}%);
          }
        }
      }
    `
  }
  return ''
}

function startViewTransition(update: () => void) {
  if (
    typeof document !== 'undefined' &&
    'startViewTransition' in document &&
    typeof (document as any).startViewTransition === 'function'
  ) {
    ;(document as any).startViewTransition(update)
    return
  }
  update()
}

export function ThemeToggleButton({
  theme,
  className,
  onClick,
  variant = 'circle',
  start = 'center',
  showLabel = false,
  disabled,
}: {
  theme: Theme
  className?: string
  onClick?: () => void
  variant?: AnimationVariant
  start?: StartPosition
  showLabel?: boolean
  disabled?: boolean
}) {
  const handleClick = useCallback(() => {
    if (typeof document === 'undefined') {
      onClick?.()
      return
    }
    const style = document.createElement('style')
    style.textContent = getAnimationCss(variant, start)
    if (style.textContent.trim().length > 0) {
      document.head.append(style)
    }
    startViewTransition(() => {
      onClick?.()
    })
    setTimeout(() => {
      if (style.parentNode) {
        style.remove()
      }
    }, 3000)
  }, [onClick, variant, start])

  const label = theme === 'light' ? 'dark' : 'light'

  return (
    <Button
      variant="outline"
      size={showLabel ? 'default' : 'icon'}
      onClick={handleClick}
      className={cn(
        'relative overflow-hidden transition-all',
        showLabel && 'gap-2',
        className
      )}
      aria-label={`Switch to ${label} theme`}
      disabled={disabled}
    >
      {theme === 'light' ? (
        <Sun className="size-[1.2rem]" />
      ) : (
        <Moon className="size-[1.2rem]" />
      )}
      {showLabel ? <span className="text-sm capitalize">{label}</span> : null}
    </Button>
  )
}
