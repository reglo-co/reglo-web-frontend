import { Logo } from '@/modules/common/ui'

export function PageLoading() {
  return (
    <div className="bg-background flex h-screen w-full items-center justify-center">
      <Logo.Symbol className="text-foreground/20 size-10 animate-spin" />
    </div>
  )
}
