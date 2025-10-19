import { Button } from '@common/components/ui'
import { UserRoundPlus } from 'lucide-react'
import { useState } from 'react'
import { Collaborators } from 'src/modules/collaborators/components'

type ControlProps = {
  limit: number
}

type Collaborator = {
  email: string
  permission: 'admin' | 'editor' | 'viewer'
}

export function CollaboratorsPermissionsControl({ limit }: ControlProps) {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([
    { email: '', permission: 'viewer' },
  ])

  function addCollaborator() {
    if (collaborators.length >= limit) {
      return
    }

    setCollaborators([...collaborators, { email: '', permission: 'viewer' }])
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 overflow-y-auto pt-4">
        {collaborators.map((_, index) => (
          <Collaborators.Permissions key={`collaborator-${index}`} />
        ))}
      </div>

      {collaborators.length < limit && (
        <div className="flex justify-end">
          <Button
            onClick={addCollaborator}
            variant="default"
            size="default"
            className="w-fit !px-4"
            rounded
          >
            <UserRoundPlus className="size-4" />
            Adicionar
          </Button>
        </div>
      )}
    </div>
  )
}
