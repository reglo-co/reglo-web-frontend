'use client'

import { useModal } from '@core/stores'
import { WithOrganization } from '@core/types'
import { Project } from '@projects/types'
import { TableHeaderButton } from '@projects/ui'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Button } from '@ui/primitives/button'
import { getAuth0UsersByEmailService } from '@users/services/get-auth0-users-by-email.service'
import { Mailbox, Plus, RefreshCcw, RotateCcw } from 'lucide-react'
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

import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

type Member = {
  id: string
  name: string
  avatarUrl?: string
}

type ProjectTable = {
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

export function ProjectTableList({
  list,
  isFetching,
}: {
  list: Project[]
  isFetching: boolean
}) {
  const [delayFetching, setDelayFetching] = React.useState(false)

  React.useEffect(() => {
    if (isFetching) {
      setTimeout(() => {
        setDelayFetching(false)
      }, 1000)
    }
  }, [isFetching])

  const params = useParams<WithOrganization>()
  const router = useRouter()
  const { open } = useModal()
  const queryClient = useQueryClient()

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

  const projects = React.useMemo<ProjectTable[]>(
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

  const columns = React.useMemo<ColumnDef<ProjectTable>[]>(
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
                      className="ring-background size-5 ring-2"
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
    const slug = params?.organization
    const href = `/${slug}/${projectId}`
    router.push(href)
  }

  return (
    <div className="flex flex-col gap-12">
      <div className="flex w-full items-center justify-between">
        <h2 className="type-h3 font-bold tracking-wide">Projetos</h2>
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => {
              setDelayFetching(true)
              queryClient.invalidateQueries({
                queryKey: ['list-organization-projects'],
              })
            }}
          >
            {isFetching || delayFetching ? (
              <RefreshCcw className="size-3.5 animate-spin" />
            ) : (
              <RotateCcw className="size-3.5" />
            )}
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => open('create-project')}
          >
            <Plus className="size-3.5" />
            <span className="pt-0.5 text-sm font-medium">Novo projeto</span>
          </Button>
        </div>
      </div>
      <Table
        data-fetching={isFetching || delayFetching}
        className="transition-base data-[fetching=true]:pointer-events-none data-[fetching=true]:opacity-25"
      >
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
    </div>
  )
}
