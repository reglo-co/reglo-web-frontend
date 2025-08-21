'use server'

import { Skeleton } from '@/components/ui/skeleton'
import { getProjectUserListAction } from '@/modules/project/actions/project-user-list'
import { TeamSwitchUi } from './team-switch-ui'
import { Suspense } from 'react'

async function TeamSwitchServer() {
  const teams = await getProjectUserListAction()

  return <TeamSwitchUi teams={teams} />
}

export async function TeamSwitch() {
  return (
    <div className="flex h-12 w-full">
      <Suspense
        fallback={<Skeleton className="size-full rounded-none bg-zinc-200" />}
      >
        <TeamSwitchServer />
      </Suspense>
    </div>
  )
}
