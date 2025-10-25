import { useWorkspaceModalStore } from '@/modules/workspaces/store'
import { Modal } from '@common/components/modal/modal'
import { Button, Input } from '@common/components/ui'
import { ArrowLeft } from 'lucide-react'
import { Fragment } from 'react'

import { useWorkspaceSlugAvailable } from '@/modules/workspaces/hooks'
import { VerifyInput } from '@common/components/verify-input/verify-input'

type WorkspaceCreateStep2Props = {
  previousStep: () => void
  nextStep: () => void
}

export function WorkspaceCreateStep2({
  previousStep,
  nextStep,
}: WorkspaceCreateStep2Props) {
  const { name, setName, slug, setSlug } = useWorkspaceModalStore()
  const { available } = useWorkspaceSlugAvailable()

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value)
  }

  function handleSlugChange(e: React.ChangeEvent<HTMLInputElement>) {
    let value = e.target.value.toLowerCase()

    // Remove espaços
    value = value.replace(/\s+/g, '')

    // Mantém apenas letras, números e hífen
    value = value.replace(/[^a-z0-9-]/g, '')

    // Remove hífens do início e do fim
    value = value.replace(/^-+$/g, '')

    // Se começar com número, adiciona prefixo "x"
    if (/^[0-9]/.test(value)) {
      value = `x${value}`
    }

    // Limita a 36 caracteres
    if (value.length > 36) {
      value = value.substring(0, 36)
    }

    setSlug(value)
  }

  return (
    <Fragment>
      <Modal.body>
        <Input
          value={name}
          onChange={handleNameChange}
          className="!text-lg font-medium tracking-wide"
          placeholder="Nome do projeto"
          maxLength={28}
        />
        <div className="flex items-center pl-2">
          <VerifyInput status={available} />
          <span className="text-rg-gray-500 text-rg-label-support text-xs">
            reglo.co/workspace/
          </span>
          <Input
            placeholder="..."
            value={slug}
            onChange={handleSlugChange}
            className="hover:!bg-rg-gray-0 rg-transition h-8 flex-1 rounded-md border-none !bg-white p-0 px-2 font-semibold shadow-none"
          />
        </div>
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
          variant="default"
          size="default"
          className="uppercase"
          onClick={nextStep}
          disabled={available !== 'success'}
          rounded
        >
          Escolher
        </Button>
      </Modal.footer>
    </Fragment>
  )
}
