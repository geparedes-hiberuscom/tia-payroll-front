import { cva } from 'class-variance-authority';

export const MultiSelectListContainerStyles = cva('flex flex-col gap-sm');

export const MultiSelectListLabelStyles = cva('text-sm font-medium text-text');

export const MultiSelectListSearchStyles = cva(
  'w-full rounded-sm border border-border bg-surface px-sm py-sm text-sm text-text placeholder:text-text-secondary transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60',
);

export const MultiSelectListBoxStyles = cva(
  'rounded-sm border border-border bg-bg p-sm max-h-2xl overflow-y-auto',
);

export const MultiSelectListEmptyStyles = cva('m-0 text-sm text-text-secondary');

export const MultiSelectListOptionsStyles = cva('flex flex-col gap-xs');

export const MultiSelectListOptionLabelStyles = cva(
  'flex items-center gap-sm rounded-sm px-xs py-xs text-sm text-text transition-colors duration-200',
  {
    variants: {
      disabled: {
        true: 'cursor-not-allowed opacity-50',
        false: 'cursor-pointer hover:bg-surface',
      },
    },
    defaultVariants: {
      disabled: false,
    },
  },
);

export const MultiSelectListCheckboxStyles = cva(
  'h-sm w-sm cursor-pointer rounded-sm border-border text-primary focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-60',
);
