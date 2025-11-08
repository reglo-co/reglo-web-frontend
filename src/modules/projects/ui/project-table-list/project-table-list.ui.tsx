'use client'

import { useFakeLoading } from '@core/hooks/use-fake-loading.hoos'
import { useModal } from '@core/stores'
import { COLUMNS_LIST_PROJECTS } from '@projects/const'
import { ProjectTable } from '@projects/types'
import { useQueryClient } from '@tanstack/react-query'
import { Button } from '@ui/primitives/button'
import { Plus, RefreshCcw, RotateCcw } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@ui/primitives'

import {
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

type ProjectTableListProps = {
  list: ProjectTable[]
  isFetching: boolean
  organization: string
}

export function ProjectTableList({
  list,
  isFetching,
  organization,
}: ProjectTableListProps) {
  const isFetchingDelayed = useFakeLoading(isFetching)
  const router = useRouter()
  const queryClient = useQueryClient()
  const { open } = useModal()
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: 'updatedAt',
      desc: false,
    },
  ])

  const table = useReactTable({
    data: list,
    columns: COLUMNS_LIST_PROJECTS,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  function handleRowClick(project: string) {
    const href = `/${organization}/${project}`
    router.push(href)
  }

  function refetch() {
    queryClient.invalidateQueries({
      queryKey: ['list-organization-projects'],
    })
  }

  return (
    <div className="flex flex-col gap-12">
      <div className="flex w-full items-center justify-between">
        <h2 className="type-h3 font-bold tracking-wide">Projetos</h2>
        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost" onClick={refetch}>
            {isFetchingDelayed ? (
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
        data-fetching={isFetchingDelayed}
        className="transition-base-medium data-[fetching=true]:pointer-events-none data-[fetching=true]:opacity-25"
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
