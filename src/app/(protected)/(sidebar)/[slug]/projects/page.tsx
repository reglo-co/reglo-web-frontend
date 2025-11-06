'use client'

import { useModal } from '@/modules/common/stores'
import { Button } from '@/modules/common/ui/primitives'
import { ProjectTableList } from '@/modules/projects/ui'
import { CreateProjectDialog } from '@/modules/projects/ui/dialogs'
import { Plus } from 'lucide-react'

export default function Page() {
  const { open } = useModal()

  return (
    <div className="container-lg flex flex-col gap-10 pt-16">
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
  )
}
