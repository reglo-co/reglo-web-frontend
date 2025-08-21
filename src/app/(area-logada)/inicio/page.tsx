'use client'

import { useEffect, useState } from 'react'
import { BlurAnimation } from '@/components/ui/animation/blur-animation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SidebarProvider } from '@/components/ui/sidebar'
import { NavLoggedHome } from '@/modules/common/components/navigation/nav-logged-home'
import { ProjectTable } from '@/modules/common/components/data-table'
import { getProjectUserListAction } from '@/modules/project/actions/project-user-list'
import type { ProjectMinimal } from '@/modules/project/typings'

export default function Page() {
  const [projects, setProjects] = useState<ProjectMinimal[]>([])

  useEffect(() => {
    getProjectUserListAction().then(setProjects)
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
              <ProjectTable projects={projects} />
            </CardContent>
          </Card>
        </div>
        <BlurAnimation />
      </div>
    </SidebarProvider>
  )
}
