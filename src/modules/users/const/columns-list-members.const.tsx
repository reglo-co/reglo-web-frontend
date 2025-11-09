import { getInitials, getTimeAgo } from '@core/helpers'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@core/ui/primitives'
import { ColumnDef } from '@tanstack/react-table'
import { OrganizationMember } from '../types'
import { TableHeaderButton } from '../ui/table-header-button'

const ROLE_LABEL: Record<OrganizationMember['role'], string> = {
  owner: 'Proprietário',
  member: 'Membro',
}

export const COLUMNS_LIST_MEMBERS: ColumnDef<OrganizationMember>[] = [
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
      const member = row.original
      return (
        <div className="flex items-center gap-3 pl-3">
          <Avatar className="size-9">
            <AvatarImage
              src={member.avatarUrl ?? undefined}
              alt={member.name}
            />
            <AvatarFallback>
              {getInitials(member.name || member.email)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">{member.name || member.email}</span>
            <span className="text-muted-foreground text-sm">
              {member.email}
            </span>
          </div>
        </div>
      )
    },
  },
  {
    id: 'role',
    accessorKey: 'role',
    header: () => <TableHeaderButton dir={false}>Função</TableHeaderButton>,
    cell: ({ row }) => {
      const member = row.original
      return <span className="pl-3">{ROLE_LABEL[member.role]}</span>
    },
  },
  {
    id: 'joinedAt',
    accessorKey: 'joinedAt',
    header: ({ column }) => {
      const dir = column.getIsSorted()
      return (
        <TableHeaderButton onClick={column.getToggleSortingHandler()} dir={dir}>
          Entrada
        </TableHeaderButton>
      )
    },
    cell: ({ getValue }) => {
      const value = String(getValue())
      const date = new Date(value)
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="text-muted-foreground pl-3">
              {getTimeAgo(date)}
            </span>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            {new Intl.DateTimeFormat('pt-BR', {
              dateStyle: 'medium',
              timeStyle: 'short',
            }).format(date)}
          </TooltipContent>
        </Tooltip>
      )
    },
  },
]
