

import { forwardRef } from 'react';
import { cn } from 'utils-tailwindcss';
import { StatusBadgeStyles, defaultLabel } from './StatusBadge.styles';
import { StatusBadgeProps } from './StatusBadge.types';

export const StatusBadge = forwardRef<HTMLSpanElement, StatusBadgeProps>(
  ({ status, label, testId, className, ...rest }, ref) => {
    return (
      <span
        ref={ref}
        data-testid={testId}
        className={cn(StatusBadgeStyles({ status }), className)}
        {...rest}
      >
        {label ?? defaultLabel[status]}
      </span>
    );
  },
);

StatusBadge.displayName = 'StatusBadge';
