'use client'

import { Skeleton } from '@/modules/common/components'
import { useWorkspacesList } from '@/modules/workspaces/hooks'

export function WorkspacesSkeleton() {
  const workspaces = useWorkspacesList()

  if (!workspaces.isLoading) {
    return null
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-col gap-10 pt-12">
        <div className="flex justify-between">
          <Skeleton className="h-10 w-72" />
          <Skeleton className="size-7" />
        </div>
        <div className="xss:grid-cols-2 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Skeleton className="h-42 w-full" />
          <Skeleton className="h-42 w-full" />
          <Skeleton className="h-42 w-full" />
        </div>
      </div>
    </div>
  )
}
