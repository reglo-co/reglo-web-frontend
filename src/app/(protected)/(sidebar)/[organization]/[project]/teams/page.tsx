'use client'

import { useUser } from '@auth0/nextjs-auth0'
import { useFeatureFlag } from '@core/feature-flags'
import { extractInitialsFromName } from '@core/helpers'
import { useFakeLoading } from '@core/hooks/use-fake-loading.hook'
import { usePathnameContext } from '@core/hooks/use-pathname-context'
import { Avatar, AvatarFallback, AvatarImage } from '@core/ui/primitives'
import type { ProjectMember } from '@projects-members'
import {
  useListProjectMembers,
  useToggleProjectMember,
} from '@projects-members/hooks'
import { useProjectBreadcrumb } from '@projects/hooks'
import { HeaderProject } from '@projects/ui'
import { useQueryClient } from '@tanstack/react-query'
import {
  Button,
  Checkbox,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@ui/primitives'
import { useListOrganizationMembers } from '@users/hooks'
import { RefreshCcw, RotateCcw } from 'lucide-react'
import { Fragment, useMemo } from 'react'

export default function Page() {
  const { organization: organizationSlug, project: projectSlug } =
    usePathnameContext()
  const isProjectOwner = useFeatureFlag('projectOwner')
  const { user } = useUser()
  const orgMembers = useListOrganizationMembers(organizationSlug)
  const projectMembers = useListProjectMembers(organizationSlug, projectSlug)
  const toggle = useToggleProjectMember(organizationSlug!, projectSlug!)
  const projectBreadcrumb = useProjectBreadcrumb()
  const queryClient = useQueryClient()

  const isLoading = useFakeLoading(
    orgMembers.isLoading || projectMembers.isLoading
  )

  const projectEmails = useMemo(() => {
    return new Set(
      projectMembers.list.map((m: ProjectMember) => m.email.toLowerCase())
    )
  }, [projectMembers.list])

  const listToShow = useMemo(() => {
    if (isProjectOwner) return orgMembers.list
    const base = orgMembers.list.filter((m) =>
      projectEmails.has(m.email.toLowerCase())
    )
    const ownerEntry = projectMembers.list.find((pm) => pm.role === 'owner')
    if (!ownerEntry) return base
    const hasOwner = base.some(
      (m) => m.email.toLowerCase() === ownerEntry.email.toLowerCase()
    )
    if (hasOwner) return base
    return [
      {
        id: ownerEntry.id,
        name: ownerEntry.email,
        email: ownerEntry.email,
        avatarUrl: null,
        role: 'owner',
        joinedAt: ownerEntry.joinedAt,
        status: 'active',
      },
      ...base,
    ]
  }, [isProjectOwner, orgMembers.list, projectEmails, projectMembers.list])

  const isFetching =
    orgMembers.isFetching || projectMembers.isFetching || toggle.isPending

  function refetch() {
    queryClient.invalidateQueries({
      queryKey: ['list-project-members', organizationSlug, projectSlug],
    })
    queryClient.invalidateQueries({
      queryKey: ['list-organization-members', organizationSlug],
    })
  }

  function onToggle(email: string, checked: boolean) {
    toggle.mutate({ email, next: checked })
  }

  if (isLoading) {
    return (
      <div className="pt-10">
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
      </div>
    )
  }

  const breadcrumb = [
    ...projectBreadcrumb,
    {
      title: 'Equipe',
    },
  ]
  return (
    <Fragment>
      <HeaderProject breadcrumb={breadcrumb} />
      <div className="pt-10">
        <div className="container-lg flex flex-col gap-12">
          <div className="flex w-full items-center justify-between">
            <h2 className="type-h4 font-bold tracking-wide">Equipe</h2>
            <Button size="icon" variant="ghost" onClick={refetch}>
              {isFetching ? (
                <RefreshCcw className="size-3.5 animate-spin" />
              ) : (
                <RotateCcw className="size-3.5" />
              )}
            </Button>
          </div>
          <Table
            data-fetching={isFetching}
            className="transition-base-medium data-[fetching=true]:pointer-events-none data-[fetching=true]:opacity-25"
          >
            <TableHeader>
              <TableRow hover={false}>
                <TableHead>Usuário</TableHead>
                <TableHead>E-mail</TableHead>
                {isProjectOwner && (
                  <TableHead className="pr-6 text-right">Membro?</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {listToShow.length ? (
                listToShow.map((member) => {
                  const inProject = projectEmails.has(
                    member.email.toLowerCase()
                  )
                  return (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="size-9">
                            <AvatarImage
                              src={member.avatarUrl ?? undefined}
                              alt={member.name || member.email}
                            />
                            <AvatarFallback>
                              {extractInitialsFromName(member.name || member.email)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">
                            {member.name || member.email}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{member.email}</TableCell>
                      {isProjectOwner && (
                        <TableCell className="pr-6! text-right">
                          <Checkbox
                            id={`toggle-project-member-${member.id}`}
                            checked={inProject}
                            onCheckedChange={(checked) =>
                              onToggle(member.email, Boolean(checked))
                            }
                            disabled={
                              toggle.isPending || member.email === user?.email
                            }
                            aria-label="toggle-project-member"
                          />
                        </TableCell>
                      )}
                    </TableRow>
                  )
                })
              ) : (
                <TableRow hover={false}>
                  <TableCell
                    colSpan={isProjectOwner ? 3 : 2}
                    className="text-muted-foreground py-10 text-center"
                  >
                    Nenhum usuário encontrado
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </Fragment>
  )
}
