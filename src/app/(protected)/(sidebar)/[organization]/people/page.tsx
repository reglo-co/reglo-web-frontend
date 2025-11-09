'use client'

import { WithOrganization } from '@core/types'
import { Container } from '@core/ui'
import { Skeleton } from '@core/ui/primitives'
import { useListOrganizationMembers } from '@users/hooks'
import { UserTableList } from '@users/ui'
import { useParams } from 'next/navigation'

export default function Page() {
  const params = useParams<WithOrganization>()
  const organization = params?.organization ?? ''
  const { list, isLoading, isFetching } =
    useListOrganizationMembers(organization)

  if (isLoading) {
    return (
      <Container className="pt-10">
        <div className="container-lg flex flex-col gap-12">
          <div className="flex w-full justify-between gap-4">
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-10 w-32" />
          </div>
          <div className="flex flex-col gap-1">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </Container>
    )
  }

  return (
    <Container className="pt-10">
      <UserTableList
        list={list}
        organization={organization}
        isFetching={isFetching}
      />
    </Container>
  )
}
