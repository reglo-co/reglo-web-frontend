'use client'

import { useFakeLoading } from '@core/hooks/use-fake-loading.hoos'
import { useQueryClient } from '@tanstack/react-query'
import {
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@ui/primitives'
import { Button } from '@ui/primitives/button'
import { COLUMNS_LIST_MEMBERS } from '@users/const'
import { OrganizationMember } from '@users/types'
import { Plus, RefreshCcw, RotateCcw } from 'lucide-react'
import { useState } from 'react'

type UserTableListProps = {
  list: OrganizationMember[]
  isFetching: boolean
  organization: string
}

export function UserTableList({
  list,
  isFetching,
  organization,
}: UserTableListProps) {
  const isFetchingDelayed = useFakeLoading(isFetching)
  const queryClient = useQueryClient()
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: 'name',
      desc: false,
    },
  ])

  const table = useReactTable({
    data: list,
    columns: COLUMNS_LIST_MEMBERS,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  function refetch() {
    queryClient.invalidateQueries({
      queryKey: ['list-organization-members', organization],
    })
  }

  return (
    <div className="container-lg flex flex-col gap-12">
      <div className="flex w-full items-center justify-between">
        <h2 className="type-h4 pl-4 font-bold tracking-wide">Pessoas</h2>
        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost" onClick={refetch}>
            {isFetchingDelayed ? (
              <RefreshCcw className="size-3.5 animate-spin" />
            ) : (
              <RotateCcw className="size-3.5" />
            )}
          </Button>
          <Button size="sm" variant="secondary" onClick={() => {}}>
            <Plus className="size-3.5" />
            <span className="pt-0.5 text-sm font-medium">Novo usuário</span>
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
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow hover={false}>
              <TableCell
                colSpan={table.getAllColumns().length}
                className="text-muted-foreground py-10 text-center"
              >
                Nenhum usuário encontrado
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
