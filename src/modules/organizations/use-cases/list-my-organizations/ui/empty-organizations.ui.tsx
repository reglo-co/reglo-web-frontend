import { useModal } from '@/modules/common/stores'
import { ExternalIcons, ThemeSwitcher } from '@ui/index'
import { Logo } from '@ui/logo'
import { Button } from '@ui/primitives/button'
import { Fragment } from 'react'

import {
  Empty,
  EmptyContent,
  EmptyHeader,
  EmptyTitle,
} from '@ui/primitives/empty'

export function EmptyOrganizations() {
  const { open } = useModal()

  return (
    <Fragment>
      <Empty className="container-sm w-full">
        <EmptyHeader>
          <ExternalIcons.Building className="text-label size-16" />

          <EmptyTitle className="type-h3! max-w-xs pt-6">
            Nenhuma organização por aqui... ainda...
          </EmptyTitle>
        </EmptyHeader>
        <EmptyContent>
          <div className="flex flex-col items-center gap-6 pt-4">
            <Button size="lg" onClick={() => open('create-organization')}>
              <Logo.Symbol className="size-3.5" />
              <span>Criar nova organização!</span>
            </Button>
            <ThemeSwitcher />
          </div>
        </EmptyContent>
      </Empty>
    </Fragment>
  )
}
