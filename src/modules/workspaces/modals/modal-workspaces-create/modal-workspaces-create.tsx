'use client'

import { LogoRegloSymbol } from '@common/components/icons/logo-reglo-symbol'
import { Modal } from '@common/components/modal'
import { Button } from '@common/components/ui/button'
import { Input } from '@common/components/ui/input'
import { useSteps } from '@common/hooks/steps.hook'
import { Plans } from '@plans/components/index'
import { ArrowLeft, ShoppingBasket } from 'lucide-react'
import { useState } from 'react'

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
          <div className="flex flex-col gap-8">
            <span className="text-rg-label label-base-1">
              Projetos disponíveis para uso:
            </span>

            <div className="grid grid-cols-2 gap-4">
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
          </div>
          <Modal.footer className="!justify-between">
            <Button
              variant="ghost"
              size="default"
              className="flex items-center gap-2 uppercase"
              rounded
            >
              <ShoppingBasket className="size-4" />
              Comprar projeto
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
        </Step>

        <Step step={1}>
          <div className="flex flex-col gap-8 pt-6">
            <Input placeholder="Nome do projeto" />
            <Input placeholder="Slug" />
          </div>
          <Modal.footer className="!justify-between">
            <Button
              variant="ghost"
              size="default"
              className="flex items-center gap-2 uppercase"
              onClick={previousStep}
              rounded
            >
              <ArrowLeft className="size-4" />
              Voltar
            </Button>
            <Button
              variant="default"
              size="default"
              className="uppercase"
              onClick={nextStep}
              rounded
            >
              Escolher
            </Button>
          </Modal.footer>
        </Step>
      </Modal.content>
    </Modal.root>
  )
}
