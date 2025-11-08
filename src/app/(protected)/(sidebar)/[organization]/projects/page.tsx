'use client'

import { WithOrganization } from '@core/types'
import { Container } from '@core/ui'
import { Skeleton } from '@core/ui/primitives'
import { useListOrganizationProjects } from '@projects/hooks'
import { ProjectEmpty, ProjectTableList } from '@projects/ui'
import { CreateProjectDialog } from '@projects/ui/dialogs'
import { useParams } from 'next/navigation'

export default function Page() {
  const params = useParams<WithOrganization>()
  const organization = params?.organization
  const { list, isLoading, isFetching } =
    useListOrganizationProjects(organization)

  const hasProjects = Boolean(list.length)

  if (isLoading) {
    return (
      <Container>
        <div className="flex flex-col gap-12">
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

  if (!hasProjects) {
    return (
      <Container>
        <ProjectEmpty className="-mt-18" />
        <CreateProjectDialog />
      </Container>
    )
  }

  return (
    <Container>
      <ProjectTableList
        list={list}
        organization={organization}
        isFetching={isFetching}
      />
      <CreateProjectDialog />
    </Container>
  )
}
