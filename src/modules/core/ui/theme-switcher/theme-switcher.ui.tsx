'use client'

import { Theme, ThemeToggleButton } from '@ui/theme-switcher'
import { useTheme } from 'next-themes'
import { useCallback, useEffect, useState } from 'react'

export function ThemeSwitcher() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const currentTheme = (resolvedTheme ?? 'light') as Theme

  const handleToggle = useCallback(() => {
    setTheme(currentTheme === 'dark' ? 'light' : 'dark')
  }, [currentTheme, setTheme])

  if (!mounted) return null

  return (
    <ThemeToggleButton
      theme={currentTheme}
      onClick={handleToggle}
      variant="circle"
      start="top-right"
    />
  )
}
