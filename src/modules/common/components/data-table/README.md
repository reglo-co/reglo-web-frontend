# Data Table Components

Esta é uma componentização modular de tabelas de dados usando React Table e Shadcn/UI, totalmente customizável para diferentes necessidades.

## Componentes Disponíveis

### DataTable
Componente principal da tabela com todas as funcionalidades integradas.

```tsx
import { DataTable } from '@/modules/common/components/data-table'

<DataTable
  columns={columns}
  data={data}
  searchKey="name"
  searchPlaceholder="Buscar..."
  showPagination={true}
  showToolbar={true}
  pageSize={10}
  onRowClick={(row) => console.log(row)}
  emptyMessage="Nenhum resultado encontrado"
/>
```

### DataTableColumnHeader
Componente para cabeçalhos de coluna com ordenação.

```tsx
import { DataTableColumnHeader } from '@/modules/common/components/data-table'

const columns = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nome" />
    ),
  }
]
```

### DataTablePagination
Componente de paginação independente.

```tsx
import { DataTablePagination } from '@/modules/common/components/data-table'

<DataTablePagination table={table} pageSizeOptions={[10, 20, 50]} />
```

### DataTableToolbar
Componente de toolbar com busca e filtros.

```tsx
import { DataTableToolbar } from '@/modules/common/components/data-table'

<DataTableToolbar
  table={table}
  searchKey="name"
  searchPlaceholder="Buscar..."
/>
```

## Exemplo de Uso Completo

### 1. Definir as Colunas

```tsx
import { ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from '@/modules/common/components/data-table'

const columns: ColumnDef<YourDataType>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nome" />
    ),
    cell: ({ row }) => <div>{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
]
```

### 2. Usar o Componente

```tsx
import { DataTable } from '@/modules/common/components/data-table'

function MyComponent() {
  const [data, setData] = useState<YourDataType[]>([])

  return (
    <DataTable
      columns={columns}
      data={data}
      searchKey="name"
      searchPlaceholder="Buscar usuários..."
      showPagination={true}
      showToolbar={true}
      pageSize={20}
      onRowClick={(row) => {
        // Navegar para detalhes do item
        router.push(`/users/${row.id}`)
      }}
      emptyMessage="Nenhum usuário encontrado"
    />
  )
}
```

### 3. Criar um Componente Específico (Recomendado)

```tsx
// user-table.tsx
import { ColumnDef } from '@tanstack/react-table'
import { DataTable, DataTableColumnHeader } from '@/modules/common/components/data-table'

const userColumns: ColumnDef<User>[] = [
  // ... definição das colunas
]

interface UserTableProps {
  users: User[]
  className?: string
}

export function UserTable({ users, className }: UserTableProps) {
  return (
    <DataTable
      columns={userColumns}
      data={users}
      searchKey="name"
      searchPlaceholder="Buscar usuários..."
      showPagination={true}
      showToolbar={true}
      pageSize={10}
      onRowClick={(user) => router.push(`/users/${user.id}`)}
      emptyMessage="Nenhum usuário encontrado"
      className={className}
    />
  )
}
```

## Props Disponíveis

### DataTableProps
- `columns`: Definição das colunas
- `data`: Dados da tabela
- `searchKey`: Chave para busca (opcional)
- `searchPlaceholder`: Placeholder do campo de busca
- `showPagination`: Mostrar paginação (padrão: true)
- `showToolbar`: Mostrar toolbar (padrão: true)
- `pageSize`: Tamanho da página (padrão: 10)
- `onRowClick`: Callback ao clicar em uma linha
- `emptyMessage`: Mensagem quando não há dados
- `className`: Classes CSS adicionais

## Funcionalidades

- ✅ Ordenação de colunas
- ✅ Paginação
- ✅ Busca global
- ✅ Filtros
- ✅ Seleção de linhas
- ✅ Redimensionamento de colunas
- ✅ Ocultar/mostrar colunas
- ✅ Responsivo
- ✅ Totalmente tipado com TypeScript
- ✅ Integração com Shadcn/UI
- ✅ Customizável

## Exemplo Prático: Tabela de Projetos

Veja o arquivo `project-table.tsx` para um exemplo completo de implementação específica para projetos.
