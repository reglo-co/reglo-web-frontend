'use client'

import { useModal } from '@core/stores'
import { Fieldset, Status } from '@core/ui'
import { sanitizeSlug } from '@organizations/helpers'
import { Logo } from '@ui/logo'
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
} from '@ui/primitives'

import { useCreateOrganization, useSlugAvailable } from '@organizations/hooks'
import { useQueryClient } from '@tanstack/react-query'
import { Check } from 'lucide-react'
import Link from 'next/link'

type FormData = {
  name: string
  slug: string
}

export function DialogCreateOrganization() {
  const queryClient = useQueryClient()
  const { isOpen, toggle } = useModal()
  const open = isOpen('create-organization')
  const { register, handleSubmit, watch, setValue, reset } = useForm<FormData>()
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false)
  const {
    createOrganization,
    isPending,
    isSuccess,
    reset: resetMutation,
  } = useCreateOrganization()
  const { isAvailable, isLoading, isFetching } = useSlugAvailable(watch('slug'))
  const name = watch('name')
  const slug = watch('slug')

  const loading = isLoading || isFetching || isPending
  const hasContent = !!name && !!slug
  const canCreate = isAvailable && !loading && hasContent

  const status = useMemo(() => {
    if (!slug) return 'neutral'
    if (isLoading || isFetching || isPending) return 'loading'
    if (isAvailable) return 'success'
    return 'error'
  }, [isLoading, isFetching, isPending, isAvailable, slug])

  // sync slug with organization name
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

  function handleCreateOrganization(value: FormData) {
    createOrganization({
      name: value.name,
      slug: value.slug,
    })
  }

  function handleClose() {
    queryClient.invalidateQueries({ queryKey: ['list-my-organizations'] })
    toggle('create-organization')
    setTimeout(() => {
      resetMutation()
      setSlugManuallyEdited(false)
      reset()
    }, 500)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="type-h4! flex items-center gap-3">
            <Logo.Symbol className="size-5" />
            <span className="type-h4! leading-none">Criar organização</span>
          </DialogTitle>
        </DialogHeader>

        <DialogDescription asChild>
          <div>
            <Activity mode={!isSuccess ? 'visible' : 'hidden'}>
              <div className="flex items-center gap-2">
                <form className="grid flex-1 gap-6">
                  <Fieldset title="Nome da organização">
                    <Input {...register('name')} />
                  </Fieldset>
                  <Fieldset title="URL da organização">
                    <div className="relative">
                      <span className="type-small text-support absolute top-1/2 left-3 -translate-y-1/2">
                        reglo.co/
                      </span>
                      <Input
                        className="pr-10 pl-18"
                        maxLength={20}
                        {...register('slug', {
                          onChange: handleSlugChange,
                        })}
                      />
                      <Status
                        className="absolute top-1/2 right-4 -translate-y-1/2"
                        status={status}
                      />
                    </div>
                    {status === 'error' && (
                      <p className="type-micro text-destructive w-full pt-2 pr-2 text-right">
                        Esta URL já está em uso
                      </p>
                    )}
                  </Fieldset>
                </form>
              </div>
            </Activity>
            <Activity mode={isSuccess ? 'visible' : 'hidden'}>
              <Empty>
                <EmptyHeader>
                  <EmptyMedia variant="default">
                    <Check className="animate-check-success size-20 text-green-500" />
                  </EmptyMedia>
                  <EmptyTitle className="type-h5! animate-fade-in">
                    Organização criada com sucesso!
                  </EmptyTitle>
                </EmptyHeader>
                <EmptyContent className="pt-6 pb-4">
                  <Link href={`/${slug}`}>
                    <Button onClick={handleClose}>
                      <Logo.Symbol className="size-3.5" />
                      <span>Ir para organização</span>
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
                onClick={handleSubmit(handleCreateOrganization)}
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
