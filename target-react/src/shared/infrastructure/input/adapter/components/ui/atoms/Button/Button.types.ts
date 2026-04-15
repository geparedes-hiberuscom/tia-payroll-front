import { ReactNode } from 'react';
import { type VariantProps } from 'class-variance-authority';
import { ButtonStyles } from './Button.styles';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof ButtonStyles> {
  /** Button label text */
  label: string;
  /** Optional leading icon as ReactNode */
  icon?: ReactNode;
  /** Loading state indicator */
  isLoading?: boolean;
  /** Test identifier */
  testId?: string;
}
