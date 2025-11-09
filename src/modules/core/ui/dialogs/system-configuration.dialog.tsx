'use client'

import { useModal } from '@core/stores'
import { Logo, ThemeSwitcher } from '@core/ui'
import { Trash2 } from 'lucide-react'

import { useFeatureFlag } from '@core/feature-flags'
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Separator,
} from '@ui/primitives'
import { Activity } from 'react'

export function SystemConfigurationDialog() {
  const isOwner = useFeatureFlag('owner')
  const { isOpen, toggle } = useModal()

  return (
    <Dialog
      open={isOpen('system-configuration')}
      onOpenChange={() => toggle('system-configuration')}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogHeader>
            <DialogTitle className="type-h4! flex items-center gap-3">
              <Logo.Symbol className="size-5" />
              <span className="type-h4! leading-none">Configurações</span>
            </DialogTitle>
          </DialogHeader>
          <DialogDescription asChild>
            <div className="flex w-full flex-col gap-6">
              <fieldset className="flex w-full flex-row items-center justify-between gap-2">
                <span>Tema da aplicação</span>
                <ThemeSwitcher />
              </fieldset>

              <Activity mode={isOwner ? 'visible' : 'hidden'}>
                <Separator />
                <fieldset className="flex w-full flex-row items-center justify-between gap-2">
                  <span />
                  <Button variant="destructive" size="sm">
                    <Trash2 className="size-4" />
                    <span className="pt-0.5">Excluir organização</span>
                  </Button>
                </fieldset>
              </Activity>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
