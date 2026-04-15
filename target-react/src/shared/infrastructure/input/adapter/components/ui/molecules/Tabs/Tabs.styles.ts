import { cva } from 'class-variance-authority';

export const TabsRootStyles = cva('w-full');

export const TabsListStyles = cva(
  'inline-flex w-full flex-wrap items-center gap-xs rounded-md bg-bg p-xs md:w-auto',
);

export const TabsTriggerStyles = cva(
  'inline-flex items-center justify-center rounded-sm px-md py-sm text-sm font-medium text-text-secondary transition-colors duration-200 hover:bg-surface hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=active]:bg-surface data-[state=active]:text-primary data-[state=active]:shadow-sm',
);

export const TabsContentStyles = cva(
  'mt-sm rounded-md border border-divider bg-surface p-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
);
