import { getInitials } from '@core/helpers'
import { TableHeaderButton } from '@projects/ui'
import { ColumnDef } from '@tanstack/react-table'
import { Mailbox } from 'lucide-react'
import { ProjectTable } from '../types'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@core/ui/primitives'

export const COLUMNS_LIST_PROJECTS: ColumnDef<ProjectTable>[] = [
  {
    id: 'name',
    accessorKey: 'name',
    header: ({ column }) => {
      const dir = column.getIsSorted()

      return (
        <TableHeaderButton onClick={column.getToggleSortingHandler()} dir={dir}>
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
        <TableHeaderButton onClick={column.getToggleSortingHandler()} dir={dir}>
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
                  <AvatarFallback>{getInitials(person.name)}</AvatarFallback>
                </Avatar>
              ))}
              {remaining > 0 && (
                <div className="bg-muted text-foreground ring-background inline-flex size-8 items-center justify-center rounded-full text-xs ring-2">
                  {remaining}
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
    cell: ({ getValue }) => <span className="pl-3">{String(getValue())}</span>,
  },
]
