'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useRouter } from 'next/navigation'
import { use } from 'react'

type PageProps = {
  params: Promise<{
    workspace: string
    id: string
  }>
}

export default function RuleModalPage({ params }: PageProps) {
  const router = useRouter()
  const { workspace, id } = use(params)

  // Este é o intercepting route que será exibido como modal
  // quando você clicar em um Link para /rules/[id]

  const handleClose = () => {
    router.back()
  }

  return (
    <Dialog open={true} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent
        className="max-h-[80vh] max-w-2xl overflow-y-auto"
        onEscapeKeyDown={handleClose}
        onPointerDownOutside={handleClose}
      >
        <DialogHeader>
          <DialogTitle>Modal da Regra {id}</DialogTitle>
          <DialogDescription>
            Este é o conteúdo do modal para a regra {id} no workspace{' '}
            {workspace}.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-muted-foreground text-sm">
            Este modal aparece quando você clica em um Link para /rules/[id] sem
            sair da página atual.
          </p>

          {/* Aqui você pode adicionar o conteúdo real do modal */}
          <div className="bg-muted rounded-lg p-4">
            <p className="text-muted-foreground text-sm">
              Conteúdo do modal será implementado aqui...
            </p>
          </div>

          {/* Exemplo de conteúdo adicional */}
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Detalhes da Regra</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">ID:</span> {id}
              </div>
              <div>
                <span className="font-medium">Workspace:</span>
                {workspace}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
