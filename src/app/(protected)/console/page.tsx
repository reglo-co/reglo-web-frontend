'use client'

import { HeaderConsole } from '@ui/index'
import { Activity, Fragment } from 'react'

import { EmptyOrganizations, ListOrganizations } from '@organizations'
import { useListMyAvailablesOrganizations } from '@organizations/hooks'
import { Skeleton } from '@ui/primitives'

export default function Page() {
  const { total, isLoading } = useListMyAvailablesOrganizations()

  const showEmptyOrganizations = total === 0 && !isLoading
  const showListOrganizations = total > 0 && !isLoading

  console.log('total', total)

  return (
    <Fragment>
      <HeaderConsole />

      <main className="page-without-header container-lg mx-auto -mt-(--header-height) flex justify-center px-6">
        <Activity mode={showEmptyOrganizations ? 'visible' : 'hidden'}>
          <EmptyOrganizations />
        </Activity>
        <Activity mode={showListOrganizations ? 'visible' : 'hidden'}>
          <ListOrganizations />
        </Activity>
        <Activity mode={isLoading ? 'visible' : 'hidden'}>
          <div className="container-xs flex w-full flex-col gap-4 pt-32">
            <div className="flex items-center justify-between gap-8">
              <Skeleton className="h-12 w-full" />
              <div className="flex items-center gap-2">
                <Skeleton className="size-10" />
                <Skeleton className="size-10" />
              </div>
            </div>
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        </Activity>
      </main>
    </Fragment>
  )
}
