import type {
  ColumnDef,
  Column,
  SortingState,
  VisibilityState,
  Table,
} from '@tanstack/react-table'

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  searchKey?: string
  searchPlaceholder?: string
  showPagination?: boolean
  showToolbar?: boolean
  showHeader?: boolean
  pageSize?: number
  onRowClick?: (row: TData) => void
  emptyBlock?: React.ReactNode
  className?: string
}

export interface DataTableColumnHeaderProps<TData, TValue> {
  column: Column<TData, TValue>
  title: string
  className?: string
}

export interface DataTablePaginationProps {
  table: Table<any>
  pageSizeOptions?: number[]
  className?: string
}

export interface DataTableToolbarProps {
  table: Table<any>
  searchKey?: string
  searchPlaceholder?: string
  showHeader?: boolean
  filters?: Array<{
    key: string
    label: string
    options: Array<{ label: string; value: string }>
  }>
  className?: string
}

export interface DataTableState {
  sorting: SortingState
  columnVisibility: VisibilityState
  rowSelection: Record<string, boolean>
  pagination: {
    pageIndex: number
    pageSize: number
  }
}
