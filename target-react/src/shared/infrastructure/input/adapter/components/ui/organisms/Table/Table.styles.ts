import { cva } from 'class-variance-authority';

export const TableRootStyles = cva('w-full max-w-full overflow-x-auto', {
  variants: {
    density: {
      compact: 'text-sm',
      comfy: 'text-base',
    },
  },
  defaultVariants: {
    density: 'comfy',
  },
});

export const TableWrapperStyles = cva('overflow-x-auto rounded-md border-0');

export const TableElementStyles = cva('w-full border-collapse');

export const TableHeadCellStyles = cva('border-b border-divider bg-transparent min-h-12 px-md py-sm font-bold text-primary');

export const TableRowStyles = cva('border-b border-divider/70');

export const TableBodyCellStyles = cva('px-md py-sm align-top text-text');

export const TableMessageCellStyles = cva('px-md py-md text-center text-text-secondary');

export const TablePaginationStyles = cva('mt-sm flex flex-wrap items-center justify-between gap-sm');

export const TablePaginationButtonsStyles = cva('flex flex-wrap p-xs items-center gap-xs');

export const TablePaginationButtonStyles = cva(
  'inline-flex justify-center items-center rounded-full font-bold border bg-secondary w-8 text-center p-xs text-sm text-text transition-colors duration-200 hover:bg-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
);

export const TablePaginationIndicatorStyles = cva('text-sm text-text-secondary');
