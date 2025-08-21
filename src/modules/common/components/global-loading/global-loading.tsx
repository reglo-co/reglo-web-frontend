'use client'

import { useGlobalLoading } from '@/modules/common/stores'

export function GlobalLoading() {
  const { loading } = useGlobalLoading()

  if (!loading) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-black/20 border-t-black dark:border-white/20 dark:border-t-white" />
    </div>
  )
}
