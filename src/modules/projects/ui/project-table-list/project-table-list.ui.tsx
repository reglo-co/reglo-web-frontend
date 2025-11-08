'use client'

import { useModal } from '@core/stores'
import { Logo } from '@ui/logo'
import { useListOrganizationProjects } from '@projects/hooks'
import { TableHeaderButton } from '@projects/ui'
import { Button } from '@ui/primitives/button'
import { Mailbox } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import * as React from 'react'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@ui/primitives'

import { Empty, EmptyContent, EmptyHeader } from '@ui/primitives/empty'

import { ExternalIcons } from '@core/ui'
import { getAuth0UsersByEmailService } from '@users/services/get-auth0-users-by-email.service'
import { useQuery } from '@tanstack/react-query'
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useTheme } from 'next-themes'

type Member = {
  id: string
  name: string
  avatarUrl?: string
}

type Project = {
  id: string
  name: string
  updatedAt: string
  members: Member[]
  rulesCount: number
}

function getInitials(name: string) {
  const parts = name.trim().split(' ')
  const first = parts.at(0)?.[0] ?? ''
  const last = parts.at(-1)?.[0] ?? ''
  return `${first}${last}`.toUpperCase()
}

export function ProjectTableList() {
  const { theme } = useTheme()
  const router = useRouter()
  const params = useParams<{ slug: string }>()
  const { list, isLoading } = useListOrganizationProjects(params?.slug)
  const { open } = useModal()

  const [sorting, setSorting] = React.useState<SortingState>([
    { id: 'name', desc: false },
  ])

  const ownerEmails = React.useMemo(
    () =>
      Array.from(
        new Set(
          (list || [])
            .map((p: any) => p.ownerEmail as string | undefined)
            .filter(Boolean) as string[]
        )
      ),
    [list]
  )

  const { data: users = [] } = useQuery({
    queryKey: ['auth0-users-by-email', ownerEmails],
    queryFn: () => getAuth0UsersByEmailService(ownerEmails),
    enabled: ownerEmails.length > 0,
  })

  const emailToUser = React.useMemo(() => {
    const map = new Map<
      string,
      { id: string; name: string; avatarUrl?: string }
    >()
    for (const u of users) {
      map.set(u.email, { id: u.email, name: u.name, avatarUrl: u.avatarUrl })
    }
    return map
  }, [users])

  console.log('emailToUser', emailToUser)

  const projects = React.useMemo<Project[]>(
    () =>
      (list || []).map((p: any) => {
        const owner = emailToUser.get(p.ownerEmail)
        return {
          id: p.slug,
          name: p.name,
          updatedAt: p.updatedAt,
          members: owner ? [owner] : [],
          rulesCount: 0,
        }
      }),
    [list, emailToUser]
  )

  const columns = React.useMemo<ColumnDef<Project>[]>(
    () => [
      {
        id: 'name',
        accessorKey: 'name',
        header: ({ column }) => {
          const dir = column.getIsSorted()

          return (
            <TableHeaderButton
              onClick={column.getToggleSortingHandler()}
              dir={dir}
            >
              Nome
            </TableHeaderButton>
          )
        },
        cell: ({ row }) => {
          const project = row.original
          return (
            <div className="flex items-center gap-2 pl-3">
              <span className="text-muted-foreground inline-flex size-5 items-center justify-center">
                <Mailbox className="size-4" />
              </span>
              <span className="truncate pt-0.5">{project.name}</span>
            </div>
          )
        },
      },
      {
        id: 'updatedAt',
        accessorKey: 'updatedAt',
        header: ({ column }) => {
          const dir = column.getIsSorted()

          return (
            <TableHeaderButton
              onClick={column.getToggleSortingHandler()}
              dir={dir}
            >
              Última atualização
            </TableHeaderButton>
          )
        },
        cell: ({ getValue }) => {
          const value = String(getValue())
          const date = new Date(value)
          const formatted = date.toLocaleDateString('pt-BR')
          return <span className="text-muted-foreground pl-3">{formatted}</span>
        },
      },
      {
        id: 'team',
        header: () => <TableHeaderButton dir={false}>Equipe</TableHeaderButton>,
        cell: ({ row }) => {
          const people = row.original.members.slice(0, 3)
          const remaining = Math.max(row.original.members.length - 3, 0)
          const title = new Intl.ListFormat('pt-BR', {
            style: 'long',
            type: 'conjunction',
          }).format(people.map((person) => person.name))

          return (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex w-fit -space-x-2 pl-3">
                  {people.slice(0, 3).map((person) => (
                    <Avatar
                      key={person.id}
                      className="ring-background size-6 ring-2"
                    >
                      <AvatarImage src={person.avatarUrl} alt={person.name} />
                      <AvatarFallback>
                        {getInitials(person.name)}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                  {remaining > 0 && (
                    <div className="bg-muted text-foreground ring-background inline-flex size-8 items-center justify-center rounded-full text-xs ring-2">
                      +{remaining}
                    </div>
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom">{title}</TooltipContent>
            </Tooltip>
          )
        },
      },
      {
        id: 'rulesCount',
        accessorKey: 'rulesCount',
        header: () => <TableHeaderButton dir={false}>Regras</TableHeaderButton>,
        cell: ({ getValue }) => (
          <span className="pl-3">{String(getValue())}</span>
        ),
      },
    ],
    []
  )

  const table = useReactTable({
    data: projects,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  const handleRowClick = (projectId: string) => {
    const slug = params?.slug
    const href = `/${slug}/${projectId}`
    router.push(href)
  }

  return !isLoading && projects.length === 0 ? (
    <Empty className="w-full">
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
  ) : (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow hover={false} key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow
            key={row.id}
            className="cursor-pointer"
            onClick={() => handleRowClick(row.original.id)}
          >
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
