import { useUser } from '@auth0/nextjs-auth0'
import { extractInitialsFromName, formatRelativeTime } from '@core/helpers'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@core/ui/primitives'
import { useCancelInvite } from '@invite/hooks'
import { useQueryClient } from '@tanstack/react-query'
import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@ui/primitives'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@ui/primitives/dropdown-menu'
import { useRemoveMember } from '@users/hooks/use-remove-member.hook'
import { Loader2, MoreHorizontal, Trash2, XCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { OrganizationMember } from '../types'
import { TableHeaderButton } from '../ui/table-header-button'

const ROLE_LABEL: Record<OrganizationMember['role'], string> = {
  owner: 'Proprietário',
  member: 'Membro',
}

export const COLUMNS_LIST_MEMBERS = (
  organization: string
): ColumnDef<OrganizationMember>[] => [
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
              {extractInitialsFromName(member.name || member.email)}
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
    id: 'status',
    header: () => <TableHeaderButton dir={false}>Status</TableHeaderButton>,
    cell: ({ row }) => {
      const member = row.original
      if (member.status === 'pending') {
        return (
          <div className="pl-3">
            <Badge variant="secondary">Convite enviado</Badge>
          </div>
        )
      }
      return (
        <span className="pl-3">
          <Badge variant="secondary" className="bg-success text-foreground">
            Ativo
          </Badge>
        </span>
      )
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
              {formatRelativeTime(date)}
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
  {
    id: 'actions',
    header: () => <TableHeaderButton dir={false}>Ações</TableHeaderButton>,
    cell: ({ row }) => {
      const { user } = useUser()
      const member = row.original
      const cancelInvite = useCancelInvite(organization)
      const removeMember = useRemoveMember(organization)
      const canRemove = member.role !== 'owner' && member.status !== 'pending'
      const canCancel = member.status === 'pending'
      const isCurrentUser = user?.email === member.email
      const router = useRouter()
      const queryClient = useQueryClient()

      if (member.role === 'owner') {
        return null
      }

      async function handlerExcludeMember() {
        if (isCurrentUser) {
          try {
            await removeMember.mutateAsync({
              memberId: member.id,
              skipInvalidate: true,
            })
            queryClient.removeQueries({
              queryKey: ['list-my-organizations-availables'],
            })
            queryClient.removeQueries({
              queryKey: ['list-my-pending-invites'],
            })
            queryClient.invalidateQueries({
              predicate: (q) =>
                Array.isArray(q.queryKey) &&
                q.queryKey[0] === 'list-organization-members',
            })
            router.replace('/console')
          } catch {
            console.error('Erro ao excluir membro')
          }
        } else {
          removeMember.mutate({ memberId: member.id })
        }
      }

      return (
        <div className="pl-3">
          <DropdownMenu>
            <DropdownMenuTrigger className="text-muted-foreground hover:bg-accent flex h-8 w-8 items-center justify-center rounded-md border">
              <MoreHorizontal className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="rounded-lg">
              {canCancel && (
                <DropdownMenuItem
                  onClick={() => cancelInvite.mutate(member.id)}
                  className="text-destructive focus:text-destructive"
                >
                  {cancelInvite.isPending ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <XCircle className="text-destructive" />
                  )}
                  <span>Cancelar convite</span>
                </DropdownMenuItem>
              )}
              {canRemove && (
                <DropdownMenuItem
                  onClick={handlerExcludeMember}
                  className="text-destructive focus:text-destructive"
                >
                  {removeMember.isPending ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Trash2 className="text-destructive" />
                  )}

                  <span>
                    {isCurrentUser ? 'Sair da organização' : 'Excluir membro'}
                  </span>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]
