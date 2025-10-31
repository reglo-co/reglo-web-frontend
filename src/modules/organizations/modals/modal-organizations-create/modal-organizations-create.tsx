'use client'

import { LogoRegloSymbol } from '@common/components/icons/logo-reglo-symbol'
import { Modal } from '@common/components/modal'
import { useSteps } from '@common/hooks/steps.hook'

import {
  OrganizationCreateStep2,
  OrganizationCreateStep3,
} from '@organizations/modals/modal-organizations-create/steps'
import { useOrganizationModalStore } from '@organizations/store'

export function ModalOrganizationsCreate() {
  const { clear } = useOrganizationModalStore()
  const { Step, nextStep, previousStep, goToStep } = useSteps()

  function onOpenChange(open: boolean) {
    if (!open) {
      clear()
      goToStep(0)
    }
  }

  return (
    <Modal.root name="create-organization" onOpenChange={onOpenChange}>
      <Modal.content>
        <Modal.header>
          <Modal.title className="flex items-center gap-3">
            <LogoRegloSymbol width={20} height={20} className="mt-0.5" />
            <span className="heading-2">Criar organização</span>
          </Modal.title>
        </Modal.header>

        {/* <Step step={0}>
          <OrganizationCreateStep1 nextStep={nextStep} />
        </Step> */}

        <Step step={0}>
          <OrganizationCreateStep2 nextStep={nextStep} />
        </Step>

        <Step step={1}>
          <OrganizationCreateStep3
            goToStep={goToStep}
            previousStep={previousStep}
          />
        </Step>
      </Modal.content>
    </Modal.root>
  )
}
