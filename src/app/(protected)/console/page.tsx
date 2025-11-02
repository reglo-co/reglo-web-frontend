'use client'

import { HeaderConsole } from '@ui/index'
import { Activity, Fragment } from 'react'

import { DialogCreateOrganization } from '@/modules/organizations/use-cases/create-organization'
import {
  EmptyOrganizations,
  ListOrganizations,
  useListMyOrganizations,
} from '@organizations/use-cases/list-my-organizations'

export default function Page() {
  const { total, isLoading } = useListMyOrganizations()

  const showEmptyOrganizations = total === 0 && !isLoading
  const showListOrganizations = total > 0 && !isLoading

  return (
    <Fragment>
      <HeaderConsole />

      <main className="page-without-header container-xl mx-auto -mt-(--header-height) flex justify-center px-6">
        <Activity mode={showEmptyOrganizations ? 'visible' : 'hidden'}>
          <EmptyOrganizations />
        </Activity>
        <Activity mode={showListOrganizations ? 'visible' : 'hidden'}>
          <ListOrganizations />
        </Activity>
        <DialogCreateOrganization />
      </main>
    </Fragment>
  )
}
