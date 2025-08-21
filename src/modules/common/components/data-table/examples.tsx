'use client'

import { useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { DataTable } from './data-table'
import { DataTableColumnHeader } from './data-table-column-header'
import { ProjectTable } from './project-table'
import { UserTable } from './user-table'

// Exemplo 1: Tabela básica com DataTable
interface SimpleData {
  id: string
  name: string
  value: number
}

const simpleColumns: ColumnDef<SimpleData>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nome" />
    ),
  },
  {
    accessorKey: 'value',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Valor" />
    ),
    cell: ({ row }) => (
      <div className="font-mono">R$ {row.getValue('value')}</div>
    ),
  },
]

export function SimpleTableExample() {
  const [data] = useState<SimpleData[]>([
    { id: '1', name: 'Item 1', value: 100.5 },
    { id: '2', name: 'Item 2', value: 250.75 },
    { id: '3', name: 'Item 3', value: 75.25 },
  ])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tabela Simples</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={simpleColumns}
          data={data}
          searchKey="name"
          searchPlaceholder="Buscar itens..."
          showPagination={false}
          showToolbar={true}
          emptyMessage="Nenhum item encontrado"
        />
      </CardContent>
    </Card>
  )
}

// Exemplo 2: Tabela com ações customizadas
interface ActionData {
  id: string
  title: string
  status: 'pending' | 'completed' | 'failed'
  priority: 'low' | 'medium' | 'high'
}

const actionColumns: ColumnDef<ActionData>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Título" />
    ),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      const statusMap = {
        pending: { label: 'Pendente', variant: 'outline' as const },
        completed: { label: 'Concluído', variant: 'default' as const },
        failed: { label: 'Falhou', variant: 'destructive' as const },
      }
      const { label, variant } = statusMap[status as keyof typeof statusMap]

      return <Badge variant={variant}>{label}</Badge>
    },
  },
  {
    accessorKey: 'priority',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Prioridade" />
    ),
    cell: ({ row }) => {
      const priority = row.getValue('priority') as string
      const priorityMap = {
        low: { label: 'Baixa', variant: 'secondary' as const },
        medium: { label: 'Média', variant: 'default' as const },
        high: { label: 'Alta', variant: 'destructive' as const },
      }
      const { label, variant } =
        priorityMap[priority as keyof typeof priorityMap]

      return <Badge variant={variant}>{label}</Badge>
    },
  },
  {
    id: 'actions',
    header: 'Ações',
    cell: ({ row }) => (
      <div className="flex gap-2">
        <Button size="sm" variant="outline">
          Editar
        </Button>
        <Button size="sm" variant="destructive">
          Excluir
        </Button>
      </div>
    ),
  },
]

export function ActionTableExample() {
  const [data] = useState<ActionData[]>([
    { id: '1', title: 'Tarefa 1', status: 'pending', priority: 'high' },
    { id: '2', title: 'Tarefa 2', status: 'completed', priority: 'medium' },
    { id: '3', title: 'Tarefa 3', status: 'failed', priority: 'low' },
  ])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tabela com Ações</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={actionColumns}
          data={data}
          searchKey="title"
          searchPlaceholder="Buscar tarefas..."
          showPagination={true}
          showToolbar={true}
          pageSize={5}
          onRowClick={(row) => console.log('Clicou em:', row)}
          emptyMessage="Nenhuma tarefa encontrada"
        />
      </CardContent>
    </Card>
  )
}

// Exemplo 3: Tabela sem toolbar
export function NoToolbarTableExample() {
  const [data] = useState<SimpleData[]>([
    { id: '1', name: 'Dados 1', value: 100 },
    { id: '2', name: 'Dados 2', value: 200 },
    { id: '3', name: 'Dados 3', value: 300 },
  ])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tabela Sem Toolbar</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={simpleColumns}
          data={data}
          showPagination={true}
          showToolbar={false}
          pageSize={10}
          emptyMessage="Nenhum dado encontrado"
        />
      </CardContent>
    </Card>
  )
}

// Exemplo 4: Tabela sem paginação
export function NoPaginationTableExample() {
  const [data] = useState<SimpleData[]>([
    { id: '1', name: 'Item A', value: 50 },
    { id: '2', name: 'Item B', value: 150 },
    { id: '3', name: 'Item C', value: 250 },
  ])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tabela Sem Paginação</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={simpleColumns}
          data={data}
          searchKey="name"
          searchPlaceholder="Buscar..."
          showPagination={false}
          showToolbar={true}
          emptyMessage="Nenhum item encontrado"
        />
      </CardContent>
    </Card>
  )
}

// Exemplo 5: Componentes específicos
export function SpecificComponentsExample() {
  // Dados de exemplo para projetos
  const [projects] = useState([
    { slug: 'projeto-1', name: 'Projeto Alpha', avatar: '' },
    { slug: 'projeto-2', name: 'Projeto Beta', avatar: '' },
  ])

  // Dados de exemplo para usuários
  const [users] = useState([
    {
      id: '1',
      name: 'João Silva',
      email: 'joao@exemplo.com',
      role: 'admin' as const,
      status: 'active' as const,
      createdAt: '2024-01-01',
    },
    {
      id: '2',
      name: 'Maria Santos',
      email: 'maria@exemplo.com',
      role: 'user' as const,
      status: 'active' as const,
      createdAt: '2024-01-02',
    },
  ])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Usando ProjectTable</CardTitle>
        </CardHeader>
        <CardContent>
          <ProjectTable projects={projects} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Usando UserTable</CardTitle>
        </CardHeader>
        <CardContent>
          <UserTable users={users} />
        </CardContent>
      </Card>
    </div>
  )
}
