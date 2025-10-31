'use client'

import { handleEmailInput } from '@/modules/common/helpers/masks'
import { LogoRegloSymbol } from '@common/components/icons/logo-reglo-symbol'
import { Modal } from '@common/components/modal'
import { Badge, Button, Textarea } from '@common/components/ui'
import { useModal } from '@common/stores'
import { useOrganizationCreate } from '@organizations/hooks'
import { useOrganizationModalStore } from '@organizations/store'
import { ArrowLeft } from 'lucide-react'
import { ChangeEvent, Fragment, useState } from 'react'

type OrganizationCreateStep3Props = {
  previousStep: () => void
  goToStep: (step: number) => void
}

export function OrganizationCreateStep3({
  previousStep,
  goToStep,
}: OrganizationCreateStep3Props) {
  const [emailText, setEmailText] = useState('')
  const modal = useModal()
  const { clear, setCollaborators, collaborators } = useOrganizationModalStore()
  const { createOrganization, isLoading } = useOrganizationCreate()

  async function handleCreateOrganization() {
    const response = await createOrganization()

    if (response.slug) {
      modal.close()
      setTimeout(() => goToStep(0), 500)
      clear()
    }
  }

  function handleSetCollaborators(event: ChangeEvent<HTMLTextAreaElement>) {
    event.preventDefault()
    event.stopPropagation()

    const value = event.target.value
    const emails = value.trim().toLowerCase().split(',')
    const emailValidated = emails.map(handleEmailInput)

    setCollaborators(
      emailValidated
        .filter((email) => email !== '')
        .map((email) => ({ email, permission: 'viewer' }))
    )

    setEmailText(emailValidated.join(','))
  }

  return (
    <Fragment>
      <Modal.body>
        <span>Adicione os e-mails dos colaboradores</span>
        <Textarea
          value={emailText}
          placeholder="email1@example.com, email2@example.com, email3@example.com"
          className="h-24 resize-none"
          onChange={handleSetCollaborators}
        />
        <div className="flex flex-wrap gap-1">
          {collaborators.map((collaborator, index) => (
            <Badge key={index} variant="secondary">
              {collaborator.email}
            </Badge>
          ))}
        </div>
      </Modal.body>

      <Modal.footer className="justify-between!">
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
          onClick={handleCreateOrganization}
          rounded
        >
          <LogoRegloSymbol
            width={14}
            height={14}
            className="group-data-[is-loading=true]:animate-spin-zoom rg-transition"
          />
          {isLoading ? 'Criando organização' : 'Criar organização'}
        </Button>
      </Modal.footer>
    </Fragment>
  )
}
