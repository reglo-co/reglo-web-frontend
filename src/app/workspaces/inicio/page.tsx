'use client'

import { useEffect, useState } from 'react'
import { BlurAnimation } from '@/components/ui/animation/blur-animation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SidebarProvider } from '@/components/ui/sidebar'
import { NavLoggedHome } from '@/modules/common/components/navigation/nav-logged-home'
import { WorkspaceTable } from '@/modules/common/components/data-table'
import { getWorkspaceUserListAction } from '@/modules/workspaces/actions/workspace-user-list'
import type { WorkspaceMinimal } from '@/modules/workspaces/typings'

export default function Page() {
  const [workspaces, setWorkspaces] = useState<WorkspaceMinimal[]>([])

  useEffect(() => {
    getWorkspaceUserListAction().then(setWorkspaces)
  }, [])

  return (
    <SidebarProvider>
      <div className="relative flex h-screen w-full flex-col items-center">
        <NavLoggedHome />
        <div className="relative -mt-10 flex w-full max-w-3xl flex-1 items-center">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-xl">Projetos</CardTitle>
            </CardHeader>
            <CardContent>
              <WorkspaceTable workspaces={workspaces} />
            </CardContent>
          </Card>
        </div>
        <BlurAnimation />
      </div>
    </SidebarProvider>
  )
}
