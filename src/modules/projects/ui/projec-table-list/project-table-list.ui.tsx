'use client'

import { TableHeaderButton } from '@/modules/projects/ui'
import { Mailbox } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import * as React from 'react'

import { useModal } from '@/modules/common/stores'
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
} from '@/modules/common/ui/primitives'
import { Button } from '@ui/primitives/button'
import {
  Empty,
  EmptyContent,
  EmptyHeader,
  EmptyTitle,
} from '@ui/primitives/empty'

import { Logo } from '@/modules/common/ui/logo'
import { useListOrganizationProjects } from '@/modules/projects/hooks'
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

type Project = {
  id: string
  name: string
  updatedAt: string
  members: Member[]
  rulesCount: number
}

const MOCK_PROJECTS: Project[] = []

function getInitials(name: string) {
  const parts = name.trim().split(' ')
  const first = parts.at(0)?.[0] ?? ''
  const last = parts.at(-1)?.[0] ?? ''
  return `${first}${last}`.toUpperCase()
}

export function ProjectTableList() {
  const router = useRouter()
  const params = useParams<{ slug: string }>()
  const { list, isLoading } = useListOrganizationProjects(params?.slug)
  const { open } = useModal()

  const [sorting, setSorting] = React.useState<SortingState>([
    { id: 'name', desc: false },
  ])

  const projects = React.useMemo<Project[]>(
    () =>
      (list || []).map((p) => ({
        id: p.slug,
        name: p.name,
        updatedAt: p.updatedAt,
        members: [],
        rulesCount: 0,
      })),
    [list]
  )

  if (!isLoading && projects.length === 0) {
    return (
      <Empty className="w-full">
        <EmptyHeader>
          <EmptyTitle className="type-h3! text-support">
            Nenhum projeto por aqui... ainda...
          </EmptyTitle>
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
    )
  }

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
          return (
            <div className="flex -space-x-2 pl-3">
              {people.map((person) => (
                <Avatar
                  key={person.id}
                  className="ring-background size-8 ring-2"
                >
                  <AvatarImage src={person.avatarUrl} alt={person.name} />
                  <AvatarFallback>{getInitials(person.name)}</AvatarFallback>
                </Avatar>
              ))}
              {remaining > 0 && (
                <div className="bg-muted text-foreground ring-background inline-flex size-8 items-center justify-center rounded-full text-xs ring-2">
                  +{remaining}
                </div>
              )}
            </div>
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

  return (
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
