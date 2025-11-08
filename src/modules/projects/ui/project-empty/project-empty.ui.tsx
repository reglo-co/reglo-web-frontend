import { cn } from '@core/lib/utils'
import { useModal } from '@core/stores'
import { PropsWithClassname } from '@core/types'
import { ExternalIcons, Logo } from '@core/ui'
import { Button, Empty, EmptyContent, EmptyHeader } from '@core/ui/primitives'

export function ProjectEmpty({ className }: PropsWithClassname) {
  const { open } = useModal()

  return (
    <Empty className={cn('w-full', className)}>
      <EmptyHeader>
        <ExternalIcons.Empty className="text-support size-46 opacity-40" />
      </EmptyHeader>
      <EmptyContent>
        <div className="flex flex-col items-center gap-6 pt-4">
          <Button
            size="lg"
            onClick={() => open('create-project')}
            className="group"
          >
            <Logo.Symbol className="transition-base size-3.5 duration-500 ease-in-out group-hover:rotate-90" />
            <span>Criar novo projeto!</span>
          </Button>
        </div>
      </EmptyContent>
    </Empty>
  )
}
