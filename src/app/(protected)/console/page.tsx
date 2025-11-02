'use client'

import { HeaderConsole } from '@ui/index'
import { Activity, Fragment } from 'react'

import {
  EmptyOrganizations,
  useListMyOrganizations,
} from '@organizations/use-cases/list-my-organizations'

export default function Page() {
  const { total, isLoading } = useListMyOrganizations()

  const showEmptyOrganizations = total === 0 && !isLoading

  return (
    <Fragment>
      <HeaderConsole />

      <main className="page-without-header container mx-auto -mt-(--header-height) flex items-center justify-center px-6">
        <Activity mode={showEmptyOrganizations ? 'visible' : 'hidden'}>
          <EmptyOrganizations />
        </Activity>
        <Activity mode={!showEmptyOrganizations ? 'visible' : 'hidden'}>
          <div>
            <h1>Organizações</h1>
          </div>
        </Activity>
      </main>
    </Fragment>
  )
}
