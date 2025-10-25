'use client'

import { useWorkspaceCreate } from '@/modules/workspaces/hooks'
import { useWorkspaceModalStore } from '@/modules/workspaces/store'
import { LogoRegloSymbol } from '@common/components/icons/logo-reglo-symbol'
import { Modal } from '@common/components/modal'
import { Button } from '@common/components/ui'
import { useModal } from '@common/stores'
import { ArrowLeft } from 'lucide-react'
import { Fragment } from 'react'
import { Collaborators } from 'src/modules/collaborators/components'

type WorkspaceCreateStep3Props = {
  previousStep: () => void
  goToStep: (step: number) => void
}

export function WorkspaceCreateStep3({
  previousStep,
  goToStep,
}: WorkspaceCreateStep3Props) {
  const modal = useModal()
  const { clear } = useWorkspaceModalStore()
  const { createWorkspace, isLoading } = useWorkspaceCreate()

  async function handleCreateWorkspace() {
    const response = await createWorkspace()

    if (response.slug) {
      modal.close()
      setTimeout(() => goToStep(0), 500)
      clear()
    }
  }

  return (
    <Fragment>
      <Modal.body>
        <Collaborators.Control />
      </Modal.body>

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
          data-is-loading={isLoading}
          variant="default"
          size="default"
          className="group rg-transition font-normal tracking-wider uppercase disabled:opacity-80"
          disabled={isLoading}
          onClick={handleCreateWorkspace}
          rounded
        >
          <LogoRegloSymbol
            width={14}
            height={14}
            className="group-data-[is-loading=true]:animate-spin-zoom rg-transition"
          />
          {isLoading ? 'Criando projeto' : 'Criar projeto'}
        </Button>
      </Modal.footer>
    </Fragment>
  )
}
