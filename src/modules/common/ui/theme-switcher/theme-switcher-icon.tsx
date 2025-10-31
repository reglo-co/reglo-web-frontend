import { cn } from '@/modules/common/lib/utils'
import { Theme } from '@/modules/common/ui/theme-switcher/theme-switcher.type'

export function ThemeSwitcherIcon({ theme }: { theme: Theme }) {
  const themeColors: Record<Theme, string> = {
    light:
      'bg-[var(--theme-light-background)] text-[var(--theme-light-foreground)]',
    dark: 'bg-[var(--theme-dark-background)] text-[var(--theme-dark-foreground)]',
    ocean:
      'bg-[var(--theme-ocean-background)] text-[var(--theme-ocean-foreground)]',
    nord: 'bg-[var(--theme-nord-background)] text-[var(--theme-nord-foreground)]',
  }

  return (
    <div
      className={cn(
        'flex items-center gap-2 rounded-md px-2 py-1 shadow-xs',
        themeColors[theme]
      )}
    >
      <span className="type-micro">Aa</span>
    </div>
  )
}
