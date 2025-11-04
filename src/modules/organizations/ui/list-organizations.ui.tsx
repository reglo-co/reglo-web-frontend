'use client'

import { useModal } from '@/modules/common/stores/modal.store'
import { Button } from '@/modules/common/ui/primitives'
import { Plus } from 'lucide-react'

import { useListMyOrganizations } from '@/modules/organizations/hooks'
import { ListOrganizationItem } from '@/modules/organizations/ui'

export function ListOrganizations() {
  const { list } = useListMyOrganizations()
  const { open } = useModal()

  return (
    <div className="container-xs flex w-full flex-col gap-6 pt-32">
      <div className="flex items-center justify-between">
        <h1 className="type-h3">Minhas organizações</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => open('create-organization')}
        >
          <Plus className="size-5" />
        </Button>
      </div>
      <div className="flex flex-col gap-3">
        {list.map((organization) => (
          <ListOrganizationItem
            key={organization.id}
            name={organization.name}
            slug={organization.slug}
          />
        ))}
      </div>
    </div>
  )
}
