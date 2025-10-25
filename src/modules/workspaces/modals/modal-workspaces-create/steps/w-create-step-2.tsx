import { useWorkspaceModalStore } from '@/modules/workspaces/store'
import { Modal } from '@common/components/modal/modal'
import { Button, Input } from '@common/components/ui'
import {
  VerifyInput,
  VerifyInputStatus,
} from '@common/components/verify-input/verify-input'
import { Helper } from '@common/helpers'
import { useDebounce } from '@common/hooks'
import { ArrowLeft } from 'lucide-react'
import { Fragment, useEffect, useState } from 'react'

type WorkspaceCreateStep2Props = {
  previousStep: () => void
  nextStep: () => void
}

export function WorkspaceCreateStep2({
  previousStep,
  nextStep,
}: WorkspaceCreateStep2Props) {
  const { name, setName } = useWorkspaceModalStore()
  const [slug, setSlug] = useState('')

  const [verifyInputStatus, setVerifyInputStatus] =
    useState<VerifyInputStatus>('neutral')

  // Debounce para slug com delay de 500ms
  const debouncedSlug = useDebounce(slug, 500)

  // Executa a validação quando os valores debounced mudarem
  useEffect(() => {
    validateSlug()
  }, [debouncedSlug])

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value)
    setSlug(Helper.toSlug(e.target.value))
  }

  function validateSlug() {
    setVerifyInputStatus('loading')
    const isSuccess = Math.random() < 0.5

    if (debouncedSlug.length === 0) {
      setVerifyInputStatus('neutral')
      return
    }

    setTimeout(() => {
      setVerifyInputStatus(isSuccess ? 'success' : 'invalid')
    }, 1000)
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
          <VerifyInput status={verifyInputStatus} />
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
          disabled={verifyInputStatus !== 'success'}
          rounded
        >
          Escolher
        </Button>
      </Modal.footer>
    </Fragment>
  )
}
