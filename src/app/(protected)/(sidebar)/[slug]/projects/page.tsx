'use client'

import { useModal } from '@core/stores'
import { Button } from '@ui/primitives'
import { ProjectTableList } from '@projects/ui'
import { CreateProjectDialog } from '@projects/ui/dialogs'
import { Plus } from 'lucide-react'

export default function Page() {
  const { open } = useModal()

  return (
    <div className="bg-background h-full w-full rounded-2xl py-2 pr-2">
      <div className="bg-background-muted border-border/50 flex h-full flex-col gap-10 rounded-2xl border pt-16">
        <div className="container-lg flex flex-col gap-12">
          <div className="flex w-full items-center justify-between">
            <h2 className="type-h3 font-bold tracking-wide">Projetos</h2>

            <Button
              size="sm"
              variant="secondary"
              onClick={() => open('create-project')}
            >
              <Plus className="size-3.5" />
              <span className="pt-0.5 text-sm font-medium">Novo projeto</span>
            </Button>
          </div>

          <ProjectTableList />
          <CreateProjectDialog />
        </div>
      </div>
    </div>
  )
}
