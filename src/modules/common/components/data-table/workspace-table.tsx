'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DataTable } from './data-table'
import { DataTableColumnHeader } from './data-table-column-header'
import type { WorkspaceMinimal } from '@/modules/workspaces/typings'
import { useCallback } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Plus } from 'lucide-react'

const workspaceColumns: ColumnDef<WorkspaceMinimal>[] = [
  {
    accessorKey: 'avatar',
    header: '',
    enableResizing: false,
    enableSorting: false,
    cell: ({ row }) => (
      <div className="flex w-[50px] justify-center">
        <Avatar className="size-10 max-w-10">
          <AvatarImage src={row.original.avatar} />
          <AvatarFallback>{row.original.name.charAt(0)}</AvatarFallback>
        </Avatar>
      </div>
    ),
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Projeto" />
    ),
    cell: ({ row }) => (
      <div className="cursor-pointer truncate text-left">
        {row.getValue('name')}
      </div>
    ),
  },
]

interface WorkspaceTableProps {
  workspaces: WorkspaceMinimal[]
  className?: string
}

export function WorkspaceTable({ workspaces, className }: WorkspaceTableProps) {
  const handleRowClick = (workspace: WorkspaceMinimal) => {
    // Verificar se window está disponível (não está durante SSR)
    if (typeof window === 'undefined') {
      return
    }

    window.location.href = `/${workspace.slug}`
  }

  const EmptyBlock = useCallback(() => {
    return (
      <Button asChild>
        <Link href="/projetos/novo">
          <Plus className="h-4 w-4" />
          Criar projeto
        </Link>
      </Button>
    )
  }, [])

  return (
    <div className={className}>
      <DataTable
        columns={workspaceColumns}
        data={workspaces}
        showToolbar={false}
        showHeader={false}
        showPagination={false}
        pageSize={10}
        onRowClick={handleRowClick}
        emptyBlock={<EmptyBlock />}
        className="[&_td[data-column-id=avatar]]:w-16 [&_th[data-column-id=avatar]]:w-16"
      />
    </div>
  )
}
