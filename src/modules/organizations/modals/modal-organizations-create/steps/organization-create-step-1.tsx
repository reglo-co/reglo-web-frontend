import { useOrganizationAvailable } from '@/modules/organizations/hooks/use-organization-available/use-organization-available'
import { Modal } from '@common/components/modal'
import { Button, Skeleton } from '@common/components/ui'
import { useOrganizationModalStore } from '@organizations/store'
import { Plans } from '@plans/components'
import { CircleFadingArrowUp } from 'lucide-react'
import { Fragment } from 'react'

type OrganizationCreateStep1Props = {
  nextStep: () => void
}

export function OrganizationCreateStep1({
  nextStep,
}: OrganizationCreateStep1Props) {
  const { plan, togglePlan } = useOrganizationModalStore()
  const { list, isLoading, remaining } = useOrganizationAvailable()

  const canCreateOrganization = remaining > 0

  return (
    <Fragment>
      <Modal.body>
        {canCreateOrganization && !isLoading && (
          <>
            <span className="text-rg-label label-base-1">
              Selecione o plano:
            </span>

            <div className="xs:grid-cols-2 grid grid-cols-1 gap-4 pt-2">
              {list.map((available) => (
                <Plans.CardSelect
                  name={available.plan.toUpperCase()}
                  users={available.collaboratorLimit}
                  quantity={available.organizationsRemaining}
                  isSelected={plan === available.plan}
                  onClick={() => togglePlan(available.plan)}
                  key={available.plan}
                  disabled={available.organizationsRemaining === 0}
                  price={available.priceMonthly}
                  workspaceLimit={available.workspaceLimit}
                />
              ))}
            </div>
          </>
        )}

        {!canCreateOrganization && !isLoading && (
          <div className="flex flex-col items-center justify-center gap-2 pt-10 pb-4">
            <span className="text-rg-label label-base-1 text-xl">
              Nenhuma organização disponível para criação
            </span>
            <span className="text-rg-label-support text-md max-w-md text-center">
              Entre em contato com o suporte para saber mais sobre a
              disponibilidade de organizações para sua conta
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
      <Modal.footer className="justify-between!">
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
          disabled={!canCreateOrganization || isLoading || !plan}
          rounded
        >
          Escolher
        </Button>
      </Modal.footer>
    </Fragment>
  )
}
