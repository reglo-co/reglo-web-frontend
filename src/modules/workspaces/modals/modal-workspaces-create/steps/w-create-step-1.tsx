import { Modal } from '@common/components/modal'
import { Button } from '@common/components/ui'
import { Plans } from '@plans/components'
import { CircleFadingArrowUp } from 'lucide-react'
import { Fragment } from 'react'

type WorkspaceCreateStep1Props = {
  nextStep: () => void
  selectedPlan: string | null
  togglePlan: (plan: string) => () => void
}

export function WorkspaceCreateStep1({
  nextStep,
  selectedPlan,
  togglePlan,
}: WorkspaceCreateStep1Props) {
  return (
    <Fragment>
      <Modal.body>
        <span className="text-rg-label label-base-1">
          Projetos disponíveis para uso:
        </span>

        <div className="xs:grid-cols-2 grid grid-cols-1 gap-4 pt-2">
          <Plans.CardSelect
            name="PROJETO DIAMANTE"
            users={10}
            storage={20}
            quantity={3}
            isSelected={selectedPlan === 'PROJETO DIAMANTE'}
            onClick={togglePlan('PROJETO DIAMANTE')}
          />

          <Plans.CardSelect
            name="PROJETO OURO"
            users={5}
            storage={10}
            quantity={1}
            isSelected={selectedPlan === 'PROJETO OURO'}
            onClick={togglePlan('PROJETO OURO')}
          />
        </div>
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
          disabled={!selectedPlan}
          onClick={nextStep}
          rounded
        >
          Escolher
        </Button>
      </Modal.footer>
    </Fragment>
  )
}
