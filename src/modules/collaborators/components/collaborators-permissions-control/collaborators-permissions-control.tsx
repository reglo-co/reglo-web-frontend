import { Collaborators } from '@/modules/collaborators/components'
import { useUserPlanAvailables } from '@/modules/plans/hooks'
import { useWorkspaceModalStore } from '@/modules/workspaces/store'
import { Button } from '@common/components/ui'
import { Plus } from 'lucide-react'
import { useEffect, useMemo } from 'react'

export function CollaboratorsPermissionsControl() {
  const { list } = useUserPlanAvailables()
  const { collaborators, setCollaborators, plan } = useWorkspaceModalStore()

  const currentPlan = useMemo(
    () => list.find((item) => item.planId === plan),
    [list, plan]
  )

  const limit = currentPlan?.usersPerWorkspace || 0

  useEffect(() => {
    if (limit > 0 && collaborators.length === 0) {
      setCollaborators([{ email: '', permission: 'viewer' }])
    }
  }, [limit, collaborators.length, setCollaborators])

  function addCollaborator() {
    if (collaborators.length >= limit) {
      return
    }

    setCollaborators([...collaborators, { email: '', permission: 'viewer' }])
  }

  return (
    <div>
      {limit === 0 && (
        <div className="flex flex-col gap-10 pt-4 sm:gap-4">
          <span className="text-rg-label-support mx-auto max-w-sm text-center text-sm">
            Seu plano atual não permite adicionar mais colaboradores a este
            projeto.
          </span>
        </div>
      )}

      {limit > 0 && (
        <div className="flex flex-col gap-10 sm:gap-4">
          <span className="text-rg-label-support text-sm">
            Adicione colaboradores ao seu projeto e defina suas permissões:
          </span>
          <div className="xs:gap-4 flex flex-col gap-16 overflow-y-auto pt-4">
            {collaborators.map((_, index) => (
              <Collaborators.Permissions
                key={`collaborator-${index}`}
                index={index}
              />
            ))}
          </div>

          {collaborators.length < limit && (
            <div className="xs:justify-end flex justify-center">
              <Button
                onClick={addCollaborator}
                variant="default"
                size="default"
                className="w-fit !px-4 !py-4"
                rounded
              >
                <Plus className="size-4" />
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
