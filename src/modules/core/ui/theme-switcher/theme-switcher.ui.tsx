'use client'

import { Theme, ThemeSwitcherIcon } from '@ui/theme-switcher'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@ui/primitives'

const themeMap: Record<Theme, string> = {
  light: 'Light',
  dark: 'Dark',
  ocean: 'Ocean',
  nord: 'Nord',
}

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const themeName = themeMap[theme as keyof typeof themeMap]

  if (!mounted) return null

  return (
    <Select onValueChange={setTheme}>
      <SelectTrigger className="gap-3">
        <ThemeSwitcherIcon theme={theme as Theme} />
        <span className="type-small">{themeName}</span>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">
          <ThemeSwitcherIcon theme="light" />
          <span>{themeMap.light}</span>
        </SelectItem>
        <SelectItem value="dark">
          <ThemeSwitcherIcon theme="dark" />
          <span>{themeMap.dark}</span>
        </SelectItem>
        <SelectItem value="ocean">
          <ThemeSwitcherIcon theme="ocean" />
          <span>{themeMap.ocean}</span>
        </SelectItem>
        <SelectItem value="nord">
          <ThemeSwitcherIcon theme="nord" />
          <span>{themeMap.nord}</span>
        </SelectItem>
      </SelectContent>
    </Select>
  )
}
