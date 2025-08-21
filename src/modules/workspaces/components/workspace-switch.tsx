'use server'

import { Skeleton } from '@/components/ui/skeleton'
import { getWorkspaceUserListAction } from '@/modules/workspaces/actions/workspace-user-list'
import { WorkspaceSwitchUi } from './workspace-switch-ui'
import { Suspense } from 'react'

async function WorkspaceSwitchServer() {
  const teams = await getWorkspaceUserListAction()

  return <WorkspaceSwitchUi teams={teams} />
}

export async function WorkspaceSwitch() {
  return (
    <div className="flex h-12 w-full">
      <Suspense
        fallback={<Skeleton className="size-full rounded-none bg-zinc-200" />}
      >
        <WorkspaceSwitchServer />
      </Suspense>
    </div>
  )
}
