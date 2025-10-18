import { ModalType, useModal } from '@common/stores/modal.store'
import { PropsWithChildren } from 'react'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@common/components/ui'
import { DialogProps } from '@radix-ui/react-dialog'

type ModalRootProps = PropsWithChildren & DialogProps & { name: ModalType }

function ModalRoot({ children, name, onOpenChange, ...props }: ModalRootProps) {
  const modal = useModal()
  const isOpen = modal.isOpen(name)

  function handleOpenChange(open: boolean) {
    if (!open) {
      modal.close()
      setTimeout(() => {
        onOpenChange?.(false)
      }, 500)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange} {...props}>
      {children}
    </Dialog>
  )
}

export const Modal = {
  root: ModalRoot,
  trigger: DialogTrigger,
  content: DialogContent,
  header: DialogHeader,
  title: DialogTitle,
  description: DialogDescription,
  footer: DialogFooter,
  close: DialogClose,
}
