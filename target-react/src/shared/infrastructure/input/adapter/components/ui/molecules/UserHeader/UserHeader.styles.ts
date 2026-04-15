import { cva } from 'class-variance-authority';

export const UserHeaderStyles = cva(
  // Base container
  'flex flex-col gap-md',
);

export const UserHeaderCardStyles = cva(
  // Card wrapper
  'bg-surface border border-border rounded-lg shadow-sm p-lg flex flex-col gap-md',
);

export const UserHeaderTitleStyles = cva(
  // Title heading
  'text-lg font-medium text-text m-0',
);

export const UserHeaderDividerStyles = cva(
  // Divider section
  'w-full border-b border-divider flex justify-end pb-sm',
);

export const UserHeaderButtonStyles = cva(
  // User click button
  'flex items-center gap-sm rounded-sm border-none bg-transparent p-xs text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60',
  {
    variants: {
      interactive: {
        true: 'cursor-pointer hover:bg-bg',
        false: 'cursor-default',
      },
    },
    defaultVariants: {
      interactive: true,
    },
  },
);

export const UserHeaderAvatarStyles = cva(
  // Avatar image
  'w-12 h-12 rounded-full object-cover flex-shrink-0',
);

export const UserHeaderInfoStyles = cva(
  // User info column
  'flex flex-col items-start',
);

export const UserHeaderNameStyles = cva(
  // User name
  'text-sm font-medium text-text',
);

export const UserHeaderRoleStyles = cva(
  // User role
  'text-xs text-text-secondary',
);
