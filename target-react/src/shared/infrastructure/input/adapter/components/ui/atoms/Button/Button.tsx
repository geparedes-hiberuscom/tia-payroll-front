

import { forwardRef } from 'react';
import { cn } from 'utils-tailwindcss';
import { ButtonStyles } from './Button.styles';
import { ButtonProps } from './Button.types';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant,
      size,
      label,
      icon,
      isLoading,
      disabled,
      className,
      testId,
      ...rest
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled || isLoading}
        data-testid={testId}
        className={cn(ButtonStyles({ variant, size }), className)}
        {...rest}
      >
        {isLoading ? (
          <span className="animate-spin" aria-hidden="true">
            ⠋
          </span>
        ) : icon ? (
          <span aria-hidden="true">{icon}</span>
        ) : null}
        <span>{label}</span>
      </button>
    );
  },
);

Button.displayName = 'Button';
