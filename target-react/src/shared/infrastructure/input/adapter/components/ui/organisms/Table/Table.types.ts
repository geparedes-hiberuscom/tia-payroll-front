import { type VariantProps } from 'class-variance-authority';
import { TableRootStyles } from './Table.styles';

type Align = 'left' | 'center' | 'right';

export interface TableColumn<TItem> {
  key: string;
  header: React.ReactNode;
  render?: (item: TItem, index: number) => React.ReactNode;
  accessor?: keyof TItem;
  align?: Align;
  width?: string | number;
}

export interface TableProps<TItem>
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof TableRootStyles> {
  items: TItem[];
  columns: Array<TableColumn<TItem>>;
  getRowKey?: (item: TItem, index: number) => React.Key;
  onRowClick?: (item: TItem, index: number) => void;
  loading?: boolean;
  emptyMessage?: string;
  page?: number;
  pageSize?: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;
  showPagination?: boolean;
}

export type { Align };
