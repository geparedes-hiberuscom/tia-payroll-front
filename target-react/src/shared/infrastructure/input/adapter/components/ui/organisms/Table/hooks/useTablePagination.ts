import { useMemo } from 'react';

interface UseTablePaginationArgs {
  page: number;
  pageSize: number;
  totalItems: number;
}

export const useTablePagination = ({ page, pageSize, totalItems }: UseTablePaginationArgs) => {
  const safePageSize = pageSize > 0 ? pageSize : 10;
  const safePage = page >= 0 ? page : 0;

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(totalItems / safePageSize));
  }, [safePageSize, totalItems]);

  const currentPage = Math.min(safePage, totalPages - 1);

  return {
    safePageSize,
    currentPage,
    totalPages,
    canGoFirst: currentPage > 0,
    canGoPrevious: currentPage > 0,
    canGoNext: currentPage < totalPages - 1,
    canGoLast: currentPage < totalPages - 1,
  };
};
