'use client'

import { useModal } from '@/modules/common/stores'
import { Logo, ThemeSwitcher } from '@/modules/common/ui'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/modules/common/ui/primitives'

export function SystemConfigurationDialog() {
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
            <div className="flex w-full flex-col gap-2">
              <fieldset className="flex w-full flex-row items-center justify-between gap-2">
                <span>Tema da aplicação</span>
                <ThemeSwitcher />
              </fieldset>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
