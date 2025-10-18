'use client'

import { Button } from '@common/components/ui/button'
import { useModal } from '@common/stores/modal.store'
import { Workspaces } from '@workspaces/components/index'
import { useWorkspaces } from '@workspaces/hooks'
import { PlusIcon } from 'lucide-react'

export function WorkspacesList() {
  const workspaces = useWorkspaces()
  const modal = useModal()

  if (workspaces.length === 0) {
    return null
  }

  function handleClick() {
    modal.open('create-workspace')
  }

  return (
    <div
      data-slot="workspaces-list"
      className="flex w-full flex-col gap-10 pt-10 pb-10"
    >
      <div className="flex items-center justify-between">
        <h1 className="heading-1">Meus Projetos</h1>
        <Button
          variant="ghost"
          size="icon"
          className="size-7"
          rounded
          onClick={handleClick}
        >
          <PlusIcon className="size-5" />
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <Workspaces.Card
          name="SIS - Porto Seguro"
          href="/workspace/sis-porto-seguro"
        />
        <Workspaces.Card
          name="Quem disse berenise?"
          href="/workspace/quem-disse-berenise"
        />
        <Workspaces.Card name="Vibra" href="/workspace/vibra" />
      </div>
    </div>
  )
}
