'use client'

import { useDebounce } from '@common/hooks/use-debounce.hook'
import { cn } from '@common/lib/utils'
import { useCallback, useEffect, useRef, useState } from 'react'

type InputProps = React.ComponentProps<'input'> & {
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
  inputClassName?: string
  onDebounce?: (event: React.ChangeEvent<HTMLInputElement>) => void
  debounceDelay?: number
}

function Input({
  className,
  type,
  iconLeft,
  iconRight,
  inputClassName,
  onDebounce,
  debounceDelay = 300,
  onChange,
  value: controlledValue,
  ...props
}: InputProps) {
  const [internalValue, setInternalValue] = useState(controlledValue || '')
  const debouncedValue = useDebounce(
    internalValue,
    onDebounce ? debounceDelay : 0
  )
  const onDebounceRef = useRef(onDebounce)
  const lastDebouncedValue = useRef(debouncedValue)

  // Mantém a referência do onDebounce atualizada
  useEffect(() => {
    onDebounceRef.current = onDebounce
  }, [onDebounce])

  // Sincroniza com valor controlado externamente
  useEffect(() => {
    if (controlledValue !== undefined) {
      setInternalValue(controlledValue)
    }
  }, [controlledValue])

  // Chama onDebounce apenas quando o valor debounced realmente muda
  useEffect(() => {
    if (
      onDebounceRef.current &&
      debouncedValue !== lastDebouncedValue.current
    ) {
      lastDebouncedValue.current = debouncedValue
      const event = {
        target: { value: debouncedValue },
      } as React.ChangeEvent<HTMLInputElement>
      onDebounceRef.current(event)
    }
  }, [debouncedValue])

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      setInternalValue(newValue)

      // onChange sempre é chamado imediatamente para digitação fluida
      if (onChange) {
        onChange(e)
      }
    },
    [onChange]
  )

  const inputValue =
    controlledValue !== undefined ? controlledValue : internalValue
  return (
    <div
      data-slot="input-container"
      className={cn(
        'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-12 w-full min-w-0 items-center gap-3 rounded-full border bg-transparent px-4 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        className
      )}
    >
      {iconLeft}

      <input
        type={type}
        data-slot="input"
        className={cn(
          'h-full w-full border-none bg-transparent ring-0 outline-none',
          inputClassName
        )}
        value={inputValue}
        onChange={handleChange}
        {...props}
      />

      {iconRight}
    </div>
  )
}

export { Input }
