'use client'

import { LogoRegloSymbol } from '@common/components/icons/logo-reglo-symbol'
import { Modal } from '@common/components/modal'
import { useSteps } from '@common/hooks/steps.hook'
import { useState } from 'react'

import {
  WorkspaceCreateStep1,
  WorkspaceCreateStep2,
  WorkspaceCreateStep3,
} from '@workspaces/modals/modal-workspaces-create/steps'

export function ModalWorkspacesCreate() {
  const { Step, nextStep, previousStep, goToStep } = useSteps()
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  function togglePlan(plan: string) {
    return () => setSelectedPlan(selectedPlan === plan ? null : plan)
  }

  function onOpenChange(open: boolean) {
    if (!open) {
      setSelectedPlan(null)
      goToStep(0)
    }
  }

  return (
    <Modal.root name="create-workspace" onOpenChange={onOpenChange}>
      <Modal.content>
        <Modal.header>
          <Modal.title className="flex items-center gap-3">
            <LogoRegloSymbol width={20} height={20} className="mt-0.5" />
            <span className="heading-2">Criar projeto</span>
          </Modal.title>
        </Modal.header>

        <Step step={0}>
          <WorkspaceCreateStep1
            nextStep={nextStep}
            selectedPlan={selectedPlan}
            togglePlan={togglePlan}
          />
        </Step>

        <Step step={1}>
          <WorkspaceCreateStep2
            previousStep={previousStep}
            nextStep={nextStep}
          />
        </Step>

        <Step step={2}>
          <WorkspaceCreateStep3
            goToStep={goToStep}
            previousStep={previousStep}
          />
        </Step>
      </Modal.content>
    </Modal.root>
  )
}
