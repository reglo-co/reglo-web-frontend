'use client'

import { useOrganizationModalStore } from '@organizations/store'
import { useUser } from '@clerk/nextjs'
import { LogoRegloSymbol } from '@common/components/icons'
import { Button, Input } from '@common/components/ui'
import { useModal } from '@common/stores/modal.store'
import { useOrganizationsList } from '@organizations/hooks'
import { PlusIcon } from 'lucide-react'

export function OrganizationsEmpty() {
  const { user } = useUser()
  const { name, setName } = useOrganizationModalStore()
  const organizations = useOrganizationsList()
  const modal = useModal()

  if (organizations.length > 0 || organizations.isLoading) {
    return null
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      event.preventDefault()
      event.stopPropagation()

      modal.open('create-organization')
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value)
  }

  return (
    <div
      data-slot="organizations-empty"
      className="-mt-[var(--header-height)] flex h-full max-w-lg flex-col items-center justify-center gap-20"
    >
      <div className="flex flex-col items-center justify-center gap-6 text-center">
        <h1 className="heading-biggest text-rg-label">
          Olá, {user?.fullName} :)
        </h1>
        <p className="text-rg-label-support text-center text-lg">
          Que tal criar agora mesmo a sua primeira organização e começar a gerenciar
          as suas regras de negócio?
        </p>
      </div>
      <div className="w-full">
        <Input
          className="w-full"
          inputClassName="text-lg"
          placeholder="Nome da organização..."
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
              onClick={() => modal.open('create-organization')}
            >
              <PlusIcon className="size-4" />
            </Button>
          }
        />
      </div>
    </div>
  )
}
