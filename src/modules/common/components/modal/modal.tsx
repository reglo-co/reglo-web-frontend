import { cn } from '@common/lib/utils'
import { ModalType, useModal } from '@common/stores/modal.store'
import { DialogContentProps, DialogProps } from '@radix-ui/react-dialog'
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
    <Dialog
      open={isOpen}
      onOpenChange={handleOpenChange}
      modal={true}
      {...props}
    >
      {children}
    </Dialog>
  )
}

function ModalContent({ children, className, ...props }: DialogContentProps) {
  return (
    <DialogContent
      className={cn(
        'flex max-h-10/12 max-w-10/12 flex-col p-4 sm:p-8',
        className
      )}
      {...props}
    >
      {children}
    </DialogContent>
  )
}

function ModalBody({
  children,
  className,
  ...props
}: PropsWithChildren & { className?: string }) {
  return (
    <div
      className={cn(
        'flex flex-1 flex-col gap-4 overflow-x-hidden overflow-y-auto',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export const Modal = {
  root: ModalRoot,
  trigger: DialogTrigger,
  content: ModalContent,
  body: ModalBody,
  header: DialogHeader,
  title: DialogTitle,
  description: DialogDescription,
  footer: DialogFooter,
  close: DialogClose,
}
