import { useModal } from '@/modules/common/stores'
import { Fieldset, Logo, Status } from '@/modules/common/ui'
import { Activity } from 'react'

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
} from '@/modules/common/ui/primitives'

export function CreateProjectDialog() {
  const { isOpen, toggle } = useModal()

  return (
    <Dialog
      open={isOpen('create-project')}
      onOpenChange={() => toggle('create-project')}
    >
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="type-h4! flex items-center gap-3">
            <Logo.Symbol className="size-5" />
            <span className="type-h4! leading-none">Criar projeto</span>
          </DialogTitle>
        </DialogHeader>
        <DialogDescription asChild>
          <div>
            <Activity mode="visible">
              <form className="grid flex-1 gap-6">
                <Fieldset title="Nome do projeto">
                  <Input />
                </Fieldset>
                <Fieldset title="URL do projeto">
                  <div className="relative">
                    <span className="type-small text-support absolute top-1/2 left-3 -translate-y-1/2">
                      reglo.co/&#123;org&#125;/
                    </span>
                    <Input className="pr-10 pl-28" maxLength={20} />
                    <Status
                      className="absolute top-1/2 right-4 -translate-y-1/2"
                      status="neutral"
                    />
                  </div>
                </Fieldset>
              </form>
            </Activity>
          </div>
        </DialogDescription>
        <DialogFooter className="w-full">
          <div className="flex w-full justify-between">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            <Button type="submit">
              <div
                data-loading={false}
                className="data-[loading=true]:animate-spin-rotate"
              >
                <Logo.Symbol className="size-3.5" />
              </div>
              <span>Criar</span>
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
