'use client'

import { Button } from '@common/components/ui/button'
import { useModal } from '@common/stores/modal.store'
import { Workspaces } from '@workspaces/components'
import { useWorkspacesList } from '@workspaces/hooks'
import { PlusIcon } from 'lucide-react'

export function WorkspacesList() {
  const workspaces = useWorkspacesList()
  const modal = useModal()

  if (workspaces.length === 0 || workspaces.isLoading) {
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

      <div className="xss:grid-cols-2 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {workspaces.list.map((workspace) => (
          <Workspaces.Card
            key={workspace.id}
            name="SIS - Porto Seguro"
            href="/workspace/sis-porto-seguro"
          />
        ))}
      </div>
    </div>
  )
}
