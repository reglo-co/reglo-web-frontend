import { useOrganizationAvailable } from '@/modules/organizations/hooks/use-organization-available/use-organization-available'
import { Modal } from '@common/components/modal/modal'
import {
  Button,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  Input,
  Skeleton,
} from '@common/components/ui'
import { VerifyInput } from '@common/components/verify-input/verify-input'
import { useOrganizationSlugAvailable } from '@organizations/hooks'
import { useOrganizationModalStore } from '@organizations/store'
import { Apple, SendHorizontal } from 'lucide-react'
import { Fragment } from 'react'

type OrganizationCreateStep2Props = {
  nextStep: () => void
}

export function OrganizationCreateStep2({
  nextStep,
}: OrganizationCreateStep2Props) {
  const { name, setName, slug, setSlug } = useOrganizationModalStore()
  const { available } = useOrganizationSlugAvailable()
  const { remaining, isLoading } = useOrganizationAvailable()

  const canCreateOrganization = remaining > 0

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
        {canCreateOrganization && !isLoading && (
          <Fragment>
            <Input
              value={name}
              onChange={handleNameChange}
              className="text-lg font-medium tracking-wide"
              placeholder="Nome da organização"
              maxLength={28}
            />
            <div className="bg-rg-gray-0 border-rg-gray-1 flex items-center rounded-full border-2 pl-2">
              <VerifyInput status={available} />
              <span className="text-rg-gray-500 text-rg-label-support text-xs">
                reglo.co/organizations/
              </span>
              <Input
                placeholder="..."
                value={slug}
                onChange={handleSlugChange}
                className="rg-transition h-8 flex-1 rounded-md border-none bg-transparent! p-0 px-2 font-semibold shadow-none"
              />
            </div>
          </Fragment>
        )}

        {!canCreateOrganization && !isLoading && (
          <Empty className="mt-6">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Apple />
              </EmptyMedia>
              <EmptyTitle>
                Nenhuma organização disponível para criação
              </EmptyTitle>
              <EmptyDescription>
                Entre em contato com o suporte para saber mais sobre a
                disponibilidade de organizações para sua conta.
              </EmptyDescription>
              <EmptyContent className="mt-6">
                <Button variant="secondary" rounded>
                  <SendHorizontal className="size-3" />
                  <span className="-mt-0.5">Contatar suporte</span>
                </Button>
              </EmptyContent>
            </EmptyHeader>
          </Empty>
        )}

        {isLoading && (
          <div className="flex w-full flex-col gap-4">
            <Skeleton className="h-12 w-full rounded-full" />
            <Skeleton className="h-8 w-full rounded-full" />
          </div>
        )}
      </Modal.body>

      <Modal.footer className="justify-end">
        {canCreateOrganization && !isLoading && (
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
        )}
      </Modal.footer>
    </Fragment>
  )
}
