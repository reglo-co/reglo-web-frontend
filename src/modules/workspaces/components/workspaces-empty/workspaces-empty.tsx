import { LogoRegloSymbol } from '@common/components/icons'
import { Button, Input } from '@common/components/ui'
import { useWorkspaces } from '@workspaces/hooks'
import { PlusIcon } from 'lucide-react'

export function WorkspacesEmpty() {
  const workspaces = useWorkspaces()

  if (workspaces.length > 0) {
    return null
  }

  return (
    <div
      data-slot="workspaces-empty"
      className="-mt-[var(--header-height)] flex h-full max-w-lg flex-col items-center justify-center gap-20"
    >
      <div className="flex flex-col items-center justify-center gap-6 text-center">
        <h1 className="heading-biggest text-rg-label">Olá, Fulano :)</h1>
        <p className="text-rg-label-support text-center text-lg">
          Crie agora mesmo o seu primeiro projeto Reglo e comece a gerenciar as
          suas regras de negócio.
        </p>
      </div>
      <div className="w-full">
        <Input
          className="w-full"
          inputClassName="text-lg"
          placeholder="Nome do projeto..."
          autoFocus
          iconLeft={
            <LogoRegloSymbol
              width={20}
              height={20}
              className="text-rg-gray-3"
            />
          }
          iconRight={
            <Button variant="default" size="icon" className="size-7" rounded>
              <PlusIcon className="size-4" />
            </Button>
          }
        />
      </div>
    </div>
  )
}
