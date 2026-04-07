import React from 'react';

type Align = 'left' | 'center' | 'right';

export interface TableColumn<TItem> {
  key: string;
  header: React.ReactNode;
  render?: (item: TItem, index: number) => React.ReactNode;
  accessor?: keyof TItem;
  align?: Align;
  width?: string | number;
}

export interface TableProps<TItem> {
  items: TItem[];
  columns: Array<TableColumn<TItem>>;
  getRowKey?: (item: TItem, index: number) => React.Key;
  onRowClick?: (item: TItem, index: number) => void;
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
  page?: number;
  pageSize?: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;
  showPagination?: boolean;
}

const toAlign = (align: Align | undefined): React.CSSProperties['textAlign'] => {
  if (align === 'center' || align === 'right') {
    return align;
  }

  return 'left';
};

export function Table<TItem>({
  items,
  columns,
  getRowKey,
  onRowClick,
  loading = false,
  emptyMessage = 'No hay datos para mostrar.',
  className,
  page = 0,
  pageSize = 10,
  totalItems,
  onPageChange,
  showPagination = true,
}: TableProps<TItem>): React.JSX.Element {
  const safePageSize = pageSize > 0 ? pageSize : 10;
  const safePage = page >= 0 ? page : 0;
  const resolvedTotalItems = totalItems ?? items.length;
  const totalPages = Math.max(1, Math.ceil(resolvedTotalItems / safePageSize));
  const currentPage = Math.min(safePage, totalPages - 1);

  const canGoFirst = currentPage > 0;
  const canGoPrevious = currentPage > 0;
  const canGoNext = currentPage < totalPages - 1;
  const canGoLast = currentPage < totalPages - 1;

  const handleFirst = () => {
    if (onPageChange && canGoFirst) {
      onPageChange(0);
    }
  };

  const handlePrevious = () => {
    if (onPageChange && canGoPrevious) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (onPageChange && canGoNext) {
      onPageChange(currentPage + 1);
    }
  };

  const handleLast = () => {
    if (onPageChange && canGoLast) {
      onPageChange(totalPages - 1);
    }
  };

  return (
    <section className={className} data-testid="shared-table">
      <div style={{ overflowX: 'auto' }}>
        <table
          data-testid="shared-table-content"
          style={{ width: '100%', borderCollapse: 'collapse' }}
        >
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  style={{
                    textAlign: toAlign(column.align),
                    borderBottom: '1px solid #e5e7eb',
                    padding: '0.75rem',
                    whiteSpace: 'nowrap',
                    width: column.width,
                  }}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={Math.max(columns.length, 1)}
                  style={{ padding: '1rem', textAlign: 'center' }}
                  data-testid="shared-table-loading"
                >
                  Cargando...
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td
                  colSpan={Math.max(columns.length, 1)}
                  style={{ padding: '1rem', textAlign: 'center' }}
                  data-testid="shared-table-empty"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              items.map((item, index) => (
                <tr
                  key={getRowKey ? getRowKey(item, index) : index}
                  style={{
                    borderBottom: '1px solid #f3f4f6',
                    cursor: onRowClick ? 'pointer' : 'default',
                  }}
                  onClick={() => onRowClick?.(item, index)}
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      style={{
                        textAlign: toAlign(column.align),
                        padding: '0.75rem',
                        verticalAlign: 'top',
                      }}
                    >
                      {column.render
                        ? column.render(item, index)
                        : column.accessor
                          ? String(item[column.accessor] ?? '')
                          : ''}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showPagination && (
        <div
          data-testid="shared-table-pagination"
          style={{
            marginTop: '0.75rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '0.5rem',
            flexWrap: 'wrap',
          }}
        >
          <span data-testid="shared-table-total-items">
            Total de items: {resolvedTotalItems}
          </span>

          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <button
              type="button"
              onClick={handleFirst}
              disabled={!onPageChange || !canGoFirst}
              data-testid="shared-table-first"
            >
              Primera
            </button>
            <button
              type="button"
              onClick={handlePrevious}
              disabled={!onPageChange || !canGoPrevious}
              data-testid="shared-table-previous"
            >
              Anterior
            </button>

            <span data-testid="shared-table-page-indicator">
              Pagina {currentPage + 1} de {totalPages}
            </span>

            <button
              type="button"
              onClick={handleNext}
              disabled={!onPageChange || !canGoNext}
              data-testid="shared-table-next"
            >
              Siguiente
            </button>
            <button
              type="button"
              onClick={handleLast}
              disabled={!onPageChange || !canGoLast}
              data-testid="shared-table-last"
            >
              Ultima
            </button>
          </div>
        </div>
      )}
    </section>
  );
}