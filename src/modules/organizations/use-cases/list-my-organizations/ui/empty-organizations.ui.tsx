import { useModal } from '@/modules/common/stores'
import { ThemeSwitcher } from '@ui/index'
import { Logo } from '@ui/logo'
import { Button } from '@ui/primitives/button'
import { Building2 } from 'lucide-react'
import { Fragment } from 'react'

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@ui/primitives/empty'

export function EmptyOrganizations() {
  const { open } = useModal()

  return (
    <Fragment>
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Building2 strokeWidth={1.5} />
          </EmptyMedia>
          <EmptyTitle className="type-h5!">
            Nenhuma organização por aqui... ainda!
          </EmptyTitle>
          <EmptyDescription>
            Parece que tá tudo em branco, perfeito pra começar algo incrível.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div className="flex flex-col items-center gap-4">
            <Button onClick={() => open('create-organization')}>
              <Logo.Symbol className="size-3.5" />
              <span>Começar agora!</span>
            </Button>
            <ThemeSwitcher />
          </div>
        </EmptyContent>
      </Empty>
    </Fragment>
  )
}
