'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DataTable } from './data-table'
import { DataTableColumnHeader } from './data-table-column-header'
import type { ProjectMinimal } from '@/modules/project/typings'
import { useCallback } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Plus } from 'lucide-react'

const projectColumns: ColumnDef<ProjectMinimal>[] = [
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

interface ProjectTableProps {
  projects: ProjectMinimal[]
  className?: string
}

export function ProjectTable({ projects, className }: ProjectTableProps) {
  const handleRowClick = (project: ProjectMinimal) => {
    window.location.href = `/${project.slug}`
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
        columns={projectColumns}
        data={projects}
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
