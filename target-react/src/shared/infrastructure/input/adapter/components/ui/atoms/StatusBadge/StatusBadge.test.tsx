import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { StatusBadge } from './StatusBadge';

describe('StatusBadge', () => {
  it('renders with active status', () => {
    render(<StatusBadge status="active" />);
    expect(screen.getByText('Activo')).toBeInTheDocument();
  });

  it('renders all status types', () => {
    const statuses = ['active', 'pending', 'completed', 'review', 'cancelled'] as const;
    statuses.forEach((status) => {
      const { unmount } = render(<StatusBadge status={status} data-testid={`badge-${status}`} />);
      expect(screen.getByTestId(`badge-${status}`)).toBeInTheDocument();
      unmount();
    });
  });

  it('renders custom label', () => {
    render(<StatusBadge status="active" label="Custom Label" />);
    expect(screen.getByText('Custom Label')).toBeInTheDocument();
    expect(screen.queryByText('Activo')).not.toBeInTheDocument();
  });

  it('applies correct status styling', () => {
    const { container } = render(<StatusBadge status="cancelled" data-testid="error-badge" />);
    const badge = container.querySelector('span');
    expect(badge).toHaveClass('text-error');
  });

  it('accepts custom className', () => {
    const { container } = render(<StatusBadge status="active" className="custom-class" />);
    const badge = container.querySelector('span');
    expect(badge).toHaveClass('custom-class');
  });
});
