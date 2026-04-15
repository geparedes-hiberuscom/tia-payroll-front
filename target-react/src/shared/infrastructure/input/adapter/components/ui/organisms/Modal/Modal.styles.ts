import { cva } from 'class-variance-authority';

export const ModalOverlayStyles = cva(
  'fixed inset-0 z-50 bg-text/50 data-[state=open]:animate-in data-[state=closed]:animate-out',
);

export const ModalContentStyles = cva(
  'fixed left-1/2 top-1/2 z-[51] w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-lg border border-border bg-surface p-xl shadow-lg max-h-[85vh] overflow-y-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
  {
    variants: {
      size: {
        sm: 'max-w-xl',
        md: 'max-w-2xl',
        lg: 'max-w-4xl',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

export const ModalTitleStyles = cva('mb-lg text-xl font-semibold text-text');

export const ModalCloseStyles = cva(
  'absolute right-md top-md inline-flex h-8 w-8 items-center justify-center rounded-sm text-text-secondary transition-colors duration-200 hover:bg-bg hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
);
