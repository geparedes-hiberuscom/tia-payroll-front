import { cn } from "utils-tailwindcss";
import {
  TableBodyCellStyles,
  TableElementStyles,
  TableHeadCellStyles,
  TableMessageCellStyles,
  TablePaginationButtonsStyles,
  TablePaginationButtonStyles,
  TablePaginationIndicatorStyles,
  TablePaginationStyles,
  TableRootStyles,
  TableRowStyles,
  TableWrapperStyles,
} from "./Table.styles";
import { useTablePagination } from "./hooks/useTablePagination";
import { Align, TableProps } from "./Table.types";
import React from "react";

const toAlignClass = (align: Align | undefined): string => {
  if (align === "center") {
    return "text-center";
  }

  if (align === "right") {
    return "text-right";
  }

  return "text-left";
};

export function Table<TItem>({
  items,
  columns,
  getRowKey,
  onRowClick,
  loading = false,
  emptyMessage = "No hay datos para mostrar.",
  page = 0,
  pageSize = 10,
  totalItems,
  onPageChange,
  showPagination = true,
  className,
  density,
  ...rest
}: TableProps<TItem>): React.JSX.Element {
  const resolvedTotalItems = totalItems ?? items.length;

  const {
    currentPage,
    totalPages,
    canGoFirst,
    canGoPrevious,
    canGoNext,
    canGoLast,
  } = useTablePagination({
    page,
    pageSize,
    totalItems: resolvedTotalItems,
  });

  return (
    <section
      className={cn(TableRootStyles({ density }), className)}
      data-testid="shared-table"
      {...rest}
    >
      <div className={TableWrapperStyles()}>
        <table
          data-testid="shared-table-content"
          className={TableElementStyles()}
        >
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={cn(
                    TableHeadCellStyles(),
                    toAlignClass(column.align),
                  )}
                  style={column.width ? { width: column.width } : undefined}
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
                  className={TableMessageCellStyles()}
                  data-testid="shared-table-loading"
                >
                  Cargando...
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td
                  colSpan={Math.max(columns.length, 1)}
                  className={TableMessageCellStyles()}
                  data-testid="shared-table-empty"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              items.map((item, index) => (
                <tr
                  key={getRowKey ? getRowKey(item, index) : index}
                  className={cn(
                    TableRowStyles(),
                    onRowClick
                      ? "cursor-pointer transition-colors duration-200 hover:bg-bg focus-within:bg-bg"
                      : "cursor-default",
                  )}
                  onClick={() => onRowClick?.(item, index)}
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={cn(
                        TableBodyCellStyles(),
                        toAlignClass(column.align),
                      )}
                    >
                      {column.render
                        ? column.render(item, index)
                        : column.accessor
                          ? String(item[column.accessor] ?? "")
                          : ""}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showPagination ? (
        <div
          data-testid="shared-table-pagination"
          className={TablePaginationStyles()}
        >
          <span
            data-testid="shared-table-total-items"
            className={TablePaginationIndicatorStyles()}
          >
            Total: {resolvedTotalItems}
          </span>

          <div className={TablePaginationButtonsStyles()}>
            <button
              type="button"
              onClick={() => onPageChange?.(0)}
              disabled={!onPageChange || !canGoFirst}
              data-testid="shared-table-first"
              className={TablePaginationButtonStyles()}
            >
              {'<<'}

            </button>
            <button
              type="button"
              onClick={() => onPageChange?.(currentPage - 1)}
              disabled={!onPageChange || !canGoPrevious}
              data-testid="shared-table-previous"
              className={TablePaginationButtonStyles()}
            >
              {'<'}
            </button>

            <span
              data-testid="shared-table-page-indicator"
              className={TablePaginationIndicatorStyles()}
            >
              Pagina {currentPage + 1} de {totalPages}
            </span>

            <button
              type="button"
              onClick={() => onPageChange?.(currentPage + 1)}
              disabled={!onPageChange || !canGoNext}
              data-testid="shared-table-next"
              className={TablePaginationButtonStyles()}
            >
              {'>'}
            </button>
            <button
              type="button"
              onClick={() => onPageChange?.(totalPages - 1)}
              disabled={!onPageChange || !canGoLast}
              data-testid="shared-table-last"
              className={TablePaginationButtonStyles()}
            >
              {'>>'}
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
