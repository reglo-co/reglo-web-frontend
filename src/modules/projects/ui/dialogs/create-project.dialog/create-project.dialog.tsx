'use client'

import { useModal } from '@/modules/common/stores'
import { Fieldset, Logo, Status } from '@/modules/common/ui'
import { sanitizeSlug } from '@/modules/organizations/helpers'
import { useCurrentOrganization } from '@/modules/organizations/hooks/use-current-organization'
import { Check } from 'lucide-react'
import Link from 'next/link'
import { Activity, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Empty,
  EmptyContent,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  Input,
} from '@/modules/common/ui/primitives'

import {
  useCreateProject,
  useProjectSlugAvailable,
} from '@/modules/projects/hooks'
import { useQueryClient } from '@tanstack/react-query'

type FormData = {
  name: string
  slug: string
}

export function CreateProjectDialog() {
  const queryClient = useQueryClient()
  const { isOpen, toggle } = useModal()
  const organization = useCurrentOrganization()
  const organizationSlug = organization?.slug

  const { register, handleSubmit, watch, setValue, reset } = useForm<FormData>()
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false)
  const {
    createProject,
    isPending,
    isSuccess,
    reset: resetMutation,
    data: created,
  } = useCreateProject()

  const name = watch('name')
  const slug = watch('slug')

  const { isAvailable, isLoading, isFetching } = useProjectSlugAvailable(
    organizationSlug,
    slug
  )

  const loading = isLoading || isFetching || isPending
  const hasContent = !!name && !!slug && !!organizationSlug
  const canCreate = isAvailable && !loading && hasContent

  const status = useMemo(() => {
    if (!slug) return 'neutral'
    if (isLoading || isFetching || isPending) return 'loading'
    if (isAvailable) return 'success'
    return 'error'
  }, [isLoading, isFetching, isPending, isAvailable, slug])

  useEffect(() => {
    if (!slugManuallyEdited && name) {
      const generatedSlug = sanitizeSlug(name)
      setValue('slug', generatedSlug)
    }
  }, [name, slugManuallyEdited, setValue])

  function handleSlugChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    if (value !== sanitizeSlug(name || '')) {
      setSlugManuallyEdited(true)
    }
  }

  function handleCreateProject(value: FormData) {
    if (!organizationSlug) return
    createProject({
      name: value.name,
      slug: value.slug,
      organizationSlug,
    })
  }

  function handleClose() {
    queryClient.invalidateQueries({ queryKey: ['list-organization-projects'] })
    toggle('create-project')
    setTimeout(() => {
      resetMutation()
      setSlugManuallyEdited(false)
      reset()
    }, 500)
  }

  return (
    <Dialog open={isOpen('create-project')} onOpenChange={handleClose}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="type-h4! flex items-center gap-3">
            <Logo.Symbol className="size-5" />
            <span className="type-h4! leading-none">Criar projeto</span>
          </DialogTitle>
        </DialogHeader>
        <DialogDescription asChild>
          <div>
            <Activity mode={!isSuccess ? 'visible' : 'hidden'}>
              <form className="grid flex-1 gap-6">
                <Fieldset title="Nome do projeto">
                  <Input {...register('name')} />
                </Fieldset>
                <Fieldset title="URL do projeto">
                  <div className="relative">
                    <span className="type-small text-support absolute top-1/2 left-3 -translate-y-1/2">
                      reglo.co/.../
                    </span>
                    <Input
                      className="pr-10 pl-24"
                      maxLength={20}
                      {...register('slug', {
                        onChange: handleSlugChange,
                      })}
                    />
                    <Status
                      className="absolute top-1/2 right-4 -translate-y-1/2"
                      status={
                        status as 'neutral' | 'loading' | 'success' | 'error'
                      }
                    />
                  </div>
                  {status === 'error' && (
                    <p className="type-micro text-destructive w-full pt-2 pr-2 text-right">
                      A URL já está em uso. Por favor, tente outra
                    </p>
                  )}
                </Fieldset>
              </form>
            </Activity>
            <Activity mode={isSuccess ? 'visible' : 'hidden'}>
              <Empty>
                <EmptyHeader>
                  <EmptyMedia variant="default">
                    <Check className="animate-check-success size-20 text-green-500" />
                  </EmptyMedia>
                  <EmptyTitle className="type-h5! animate-fade-in">
                    Projeto criado com sucesso!
                  </EmptyTitle>
                </EmptyHeader>
                <EmptyContent className="pt-6 pb-4">
                  <Link
                    href={`/${organizationSlug}/projects/${created?.id ?? ''}`}
                  >
                    <Button onClick={handleClose}>
                      <Logo.Symbol className="size-3.5" />
                      <span>Ir para projeto</span>
                    </Button>
                  </Link>
                </EmptyContent>
              </Empty>
            </Activity>
          </div>
        </DialogDescription>
        <Activity mode={!isSuccess ? 'visible' : 'hidden'}>
          <DialogFooter className="w-full">
            <div className="flex w-full justify-between">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
              <Button
                type="submit"
                onClick={handleSubmit(handleCreateProject)}
                disabled={!canCreate}
              >
                <div
                  data-loading={isPending}
                  className="data-[loading=true]:animate-spin-rotate"
                >
                  <Logo.Symbol className="size-3.5" />
                </div>
                <span>Criar</span>
              </Button>
            </div>
          </DialogFooter>
        </Activity>
      </DialogContent>
    </Dialog>
  )
}
