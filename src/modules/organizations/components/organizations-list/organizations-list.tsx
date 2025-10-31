'use client'

import { Button } from '@common/components/ui/button'
import { useModal } from '@common/stores/modal.store'
import { Organizations } from '@organizations/components'
import { useOrganizationsList } from '@organizations/hooks'
import { PlusIcon } from 'lucide-react'

export function OrganizationsList() {
  const organizations = useOrganizationsList()
  const modal = useModal()

  if (organizations.length === 0 || organizations.isLoading) {
    return null
  }

  function handleClick() {
    modal.open('create-organization')
  }

  return (
    <div
      data-slot="organizations-list"
      className="flex w-full flex-col gap-10 pt-10 pb-10"
    >
      <div className="flex items-center justify-between">
        <h1 className="heading-1">Minhas Organizações</h1>
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
        {organizations.list.map((organization) => (
          <Organizations.Card
            key={organization.id}
            name={organization.name.toUpperCase()}
            href={`/organizations/${organization.slug}`}
          />
        ))}
      </div>
    </div>
  )
}
