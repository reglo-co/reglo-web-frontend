'use client'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/modules/common/ui/primitives'
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Mailbox, Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import * as React from 'react'

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

const MOCK_PROJECTS: Project[] = [
  {
    id: 'p-1',
    name: 'Core API',
    updatedAt: '2025-10-29',
    members: [
      { id: 'u-1', name: 'Ana Silva' },
      { id: 'u-2', name: 'Bruno Lima' },
      { id: 'u-3', name: 'Carlos Souza' },
    ],
    rulesCount: 128,
  },
  {
    id: 'p-2',
    name: 'Admin Console',
    updatedAt: '2025-10-27',
    members: [
      { id: 'u-4', name: 'Daniela Rocha' },
      { id: 'u-5', name: 'Eduardo Alves' },
      { id: 'u-6', name: 'Fernanda Reis' },
    ],
    rulesCount: 86,
  },
  {
    id: 'p-3',
    name: 'Mobile App',
    updatedAt: '2025-10-25',
    members: [
      { id: 'u-7', name: 'Gustavo Nunes' },
      { id: 'u-8', name: 'Helena Prado' },
      { id: 'u-9', name: 'Igor Mendes' },
      { id: 'u-10', name: 'Joana Dias' },
    ],
    rulesCount: 42,
  },
  {
    id: 'p-4',
    name: 'Data Platform',
    updatedAt: '2025-10-22',
    members: [
      { id: 'u-11', name: 'Karla Moraes' },
      { id: 'u-12', name: 'Lucas Peixoto' },
    ],
    rulesCount: 64,
  },
]

function getInitials(name: string) {
  const parts = name.trim().split(' ')
  const first = parts.at(0)?.[0] ?? ''
  const last = parts.at(-1)?.[0] ?? ''
  return `${first}${last}`.toUpperCase()
}

export default function Page() {
  const router = useRouter()
  const params = useParams<{ slug: string }>()

  const [sorting, setSorting] = React.useState<SortingState>([
    { id: 'name', desc: false },
  ])

  const columns = React.useMemo<ColumnDef<Project>[]>(
    () => [
      {
        id: 'name',
        accessorKey: 'name',
        header: ({ column }) => {
          const dir = column.getIsSorted()
          return (
            <button
              className="group inline-flex items-center gap-1 font-medium hover:underline"
              onClick={column.getToggleSortingHandler()}
            >
              <span>Nome</span>
              <span className="text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
                {dir === 'asc' ? '▲' : dir === 'desc' ? '▼' : '↕'}
              </span>
            </button>
          )
        },
        cell: ({ row }) => {
          const project = row.original
          return (
            <div className="flex items-center gap-2">
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
        header: () => <span>Última atualização</span>,
        cell: ({ getValue }) => {
          const value = String(getValue())
          const date = new Date(value)
          const formatted = date.toLocaleDateString('pt-BR')
          return <span className="text-muted-foreground">{formatted}</span>
        },
      },
      {
        id: 'team',
        header: () => <span>Equipe</span>,
        cell: ({ row }) => {
          const people = row.original.members.slice(0, 3)
          const remaining = Math.max(row.original.members.length - 3, 0)
          return (
            <div className="flex -space-x-2">
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
        header: () => <span>Regras</span>,
        cell: ({ getValue }) => <span>{String(getValue())}</span>,
      },
    ],
    []
  )

  const table = useReactTable({
    data: MOCK_PROJECTS,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  const handleRowClick = (projectId: string) => {
    const slug = params?.slug
    const href = `/${slug}/projects/${projectId}`
    router.push(href)
  }

  return (
    <div className="container-lg flex flex-col gap-10 pt-16">
      <div className="flex w-full items-center justify-between">
        <h2 className="type-h3 font-bold tracking-wide">Projetos</h2>
        <Button size="sm" variant="outline">
          <Plus className="size-3.5" />
          <span className="pt-0.5 text-sm font-medium">Novo projeto</span>
        </Button>
      </div>

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
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
