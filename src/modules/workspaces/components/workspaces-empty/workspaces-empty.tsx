'use client'

import { useWorkspaceModalStore } from '@/modules/workspaces/store'
import { useUser } from '@clerk/nextjs'
import { LogoRegloSymbol } from '@common/components/icons'
import { Button, Input } from '@common/components/ui'
import { useModal } from '@common/stores/modal.store'
import { useWorkspacesList } from '@workspaces/hooks'
import { PlusIcon } from 'lucide-react'

export function WorkspacesEmpty() {
  const { user } = useUser()
  const { name, setName } = useWorkspaceModalStore()
  const workspaces = useWorkspacesList()
  const modal = useModal()

  if (workspaces.length > 0 || workspaces.isLoading) {
    return null
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      event.preventDefault()
      event.stopPropagation()

      modal.open('create-workspace')
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value)
  }

  return (
    <div
      data-slot="workspaces-empty"
      className="-mt-[var(--header-height)] flex h-full max-w-lg flex-col items-center justify-center gap-20"
    >
      <div className="flex flex-col items-center justify-center gap-6 text-center">
        <h1 className="heading-biggest text-rg-label">
          Olá, {user?.fullName} :)
        </h1>
        <p className="text-rg-label-support text-center text-lg">
          Que tal criar agora mesmo o seu primeiro projeto e começar a gerenciar
          as suas regras de negócio?
        </p>
      </div>
      <div className="w-full">
        <Input
          className="w-full"
          inputClassName="text-lg"
          placeholder="Nome do projeto..."
          value={name}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          iconLeft={
            <LogoRegloSymbol
              width={20}
              height={20}
              className="text-rg-gray-3"
            />
          }
          iconRight={
            <Button
              variant="default"
              size="icon"
              className="size-7"
              rounded
              onClick={() => modal.open('create-workspace')}
            >
              <PlusIcon className="size-4" />
            </Button>
          }
        />
      </div>
    </div>
  )
}
