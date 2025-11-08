import { Logo } from '@core/ui'

export function PageLoading() {
  return (
    <div className="bg-background flex h-screen w-full items-center justify-center">
      <Logo.Symbol className="text-foreground/15 size-10 animate-spin" />
    </div>
  )
}
