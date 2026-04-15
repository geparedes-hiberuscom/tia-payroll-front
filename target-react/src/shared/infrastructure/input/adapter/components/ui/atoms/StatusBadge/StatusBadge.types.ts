import { type VariantProps } from 'class-variance-authority';
import { StatusBadgeStyles } from './StatusBadge.styles';

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof StatusBadgeStyles> {
  /** Badge status type */
  status: 'active' | 'pending' | 'completed' | 'review' | 'cancelled';
  /** Optional custom label (defaults to status name) */
  label?: string;
  /** Test identifier */
  testId?: string;
}
