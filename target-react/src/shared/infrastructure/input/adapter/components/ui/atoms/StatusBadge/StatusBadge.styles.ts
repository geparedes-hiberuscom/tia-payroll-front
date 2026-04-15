import { cva } from 'class-variance-authority';

export const StatusBadgeStyles = cva(
  // Base classes that always apply
  'inline-flex items-center rounded-full px-sm py-xs text-sm font-medium',
  {
    variants: {
      status: {
        active: 'bg-success-light text-success',
        pending: 'bg-warning-light text-warning',
        completed: 'bg-secondary-000 text-info',
        review: 'bg-primary-050 text-primary',
        cancelled: 'bg-error-light text-error',
      },
    },
    defaultVariants: {
      status: 'active',
    },
  },
);

const defaultLabel: Record<'active' | 'pending' | 'completed' | 'review' | 'cancelled', string> = {
  active: 'Activo',
  pending: 'Pendiente',
  completed: 'Finalizado',
  review: 'En revisión',
  cancelled: 'Cancelado',
};

export { defaultLabel };
