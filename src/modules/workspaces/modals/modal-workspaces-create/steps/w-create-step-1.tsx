import { Plans } from '@/modules/plans/components'
import { useUserPlanAvailables } from '@/modules/plans/hooks'
import { useWorkspaceModalStore } from '@/modules/workspaces/store'
import { Modal } from '@common/components/modal'
import { Button, Skeleton } from '@common/components/ui'
import { CircleFadingArrowUp } from 'lucide-react'
import { Fragment } from 'react'

type WorkspaceCreateStep1Props = {
  nextStep: () => void
}

export function WorkspaceCreateStep1({ nextStep }: WorkspaceCreateStep1Props) {
  const { plan, togglePlan } = useWorkspaceModalStore()
  const { list, total, isLoading } = useUserPlanAvailables()
  const canCreateWorkspace = total > 0

  return (
    <Fragment>
      <Modal.body>
        {canCreateWorkspace && !isLoading && (
          <>
            <span className="text-rg-label label-base-1">
              Projetos disponíveis para uso:
            </span>

            <div className="xs:grid-cols-2 grid grid-cols-1 gap-4 pt-2">
              {list.map((available) => (
                <Plans.CardSelect
                  name={available.planId.toUpperCase()}
                  users={available.usersPerWorkspace}
                  quantity={available.quantity}
                  isSelected={plan === available.planId}
                  onClick={() => togglePlan(available.planId)}
                  key={available.planId}
                />
              ))}
            </div>
          </>
        )}

        {!canCreateWorkspace && !isLoading && (
          <div className="flex flex-col items-center justify-center gap-3 pt-10 pb-4">
            <span className="text-rg-label label-base-1 text-lg">
              Nenhum projeto disponível no seu plano
            </span>
            <span className="text-rg-label-support text-sm">
              Faça o upgrade para continuar criando projetos
            </span>
          </div>
        )}

        {isLoading && (
          <div className="flex w-full flex-col gap-8">
            <Skeleton className="h-5 w-60 rounded-lg" />
            <div className="xs:grid-cols-2 grid grid-cols-1 gap-4">
              <Skeleton className="h-42 w-full rounded-lg" />
              <Skeleton className="h-42 w-full rounded-lg" />
            </div>
          </div>
        )}
      </Modal.body>
      <Modal.footer className="!justify-between">
        <Button
          variant="ghost"
          size="default"
          className="flex items-center gap-2 font-normal uppercase"
          rounded
        >
          <CircleFadingArrowUp strokeWidth={1.5} className="size-4" />
          Fazer upgrade
        </Button>
        <Button
          variant="default"
          size="default"
          className="uppercase"
          onClick={nextStep}
          disabled={!canCreateWorkspace}
          rounded
        >
          Escolher
        </Button>
      </Modal.footer>
    </Fragment>
  )
}
