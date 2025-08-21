'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DataTable } from './data-table'
import { DataTableColumnHeader } from './data-table-column-header'

// Exemplo de tipo de usuário
interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user' | 'moderator'
  status: 'active' | 'inactive' | 'pending'
  avatar?: string
  createdAt: string
}

const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: 'avatar',
    header: '',
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
      <DataTableColumnHeader column={column} title="Nome" />
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue('name')}</div>
    ),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.getValue('email')}</div>
    ),
  },
  {
    accessorKey: 'role',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Função" />
    ),
    cell: ({ row }) => {
      const role = row.getValue('role') as string
      const roleMap = {
        admin: { label: 'Administrador', variant: 'destructive' as const },
        user: { label: 'Usuário', variant: 'default' as const },
        moderator: { label: 'Moderador', variant: 'secondary' as const },
      }
      const { label, variant } =
        roleMap[role as keyof typeof roleMap] || roleMap.user

      return <Badge variant={variant}>{label}</Badge>
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      const statusMap = {
        active: { label: 'Ativo', variant: 'default' as const },
        inactive: { label: 'Inativo', variant: 'secondary' as const },
        pending: { label: 'Pendente', variant: 'outline' as const },
      }
      const { label, variant } =
        statusMap[status as keyof typeof statusMap] || statusMap.inactive

      return <Badge variant={variant}>{label}</Badge>
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Criado em" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue('createdAt'))
      return (
        <div className="text-muted-foreground">
          {date.toLocaleDateString('pt-BR')}
        </div>
      )
    },
  },
]

interface UserTableProps {
  users: User[]
  className?: string
}

export function UserTable({ users, className }: UserTableProps) {
  const handleRowClick = (user: User) => {
    // Exemplo de navegação para detalhes do usuário
    console.log('Clicou no usuário:', user)
    // router.push(`/users/${user.id}`)
  }

  return (
    <div className={className}>
      <DataTable
        columns={userColumns}
        data={users}
        searchKey="name"
        searchPlaceholder="Buscar usuários..."
        showPagination={true}
        showToolbar={true}
        pageSize={10}
        onRowClick={handleRowClick}
        emptyBlock={<div>Nenhum usuário encontrado</div>}
      />
    </div>
  )
}
