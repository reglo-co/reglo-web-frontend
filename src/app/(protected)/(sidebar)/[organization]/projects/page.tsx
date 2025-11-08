'use client'

import { WithOrganization } from '@core/types'
import { Container, ExternalIcons, Logo } from '@core/ui'
import { useListOrganizationProjects } from '@projects/hooks'
import { ProjectTableList } from '@projects/ui'
import { CreateProjectDialog } from '@projects/ui/dialogs'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'

import {
  Button,
  Empty,
  EmptyContent,
  EmptyHeader,
  Skeleton,
} from '@core/ui/primitives'

export default function Page() {
  const params = useParams<WithOrganization>()
  const { list, isLoading, isFetching } = useListOrganizationProjects(
    params?.organization
  )

  const hasProjects = useMemo(() => Boolean(list?.length), [list])

  if (isLoading) {
    return (
      <Container>
        <div className="flex flex-col gap-12 pt-16">
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
        <Empty className="-mt-18 w-full">
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
      </Container>
    )
  }

  return (
    <Container className="pt-16">
      <ProjectTableList list={list} isFetching={isFetching} />
      <CreateProjectDialog />
    </Container>
  )
}
