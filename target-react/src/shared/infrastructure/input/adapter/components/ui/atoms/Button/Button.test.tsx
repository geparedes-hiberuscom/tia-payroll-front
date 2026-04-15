import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renders correctly with required props', () => {
    render(<Button label="Click me" />);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('applies primary variant by default', () => {
    const { container } = render(<Button label="Primary" />);
    const button = container.querySelector('button');
    expect(button).toHaveClass('bg-primary');
  });

  it('applies variant classes', () => {
    const { container } = render(<Button label="Secondary" variant="secondary" />);
    const button = container.querySelector('button');
    expect(button).toHaveClass('border-primary');
  });

  it('applies size classes', () => {
    const { container } = render(<Button label="Large" size="lg" />);
    const button = container.querySelector('button');
    expect(button).toHaveClass('h-12');
  });

  it('renders disabled state', () => {
    render(<Button label="Disabled" disabled />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('renders loading state', () => {
    render(<Button label="Loading" isLoading />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('renders with custom className', () => {
    const { container } = render(<Button label="Custom" className="custom-class" />);
    const button = container.querySelector('button');
    expect(button).toHaveClass('custom-class');
  });

  it('renders icon when provided', () => {
    render(<Button label="With Icon" icon={<span data-testid="test-icon">🎨</span>} />);
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });
});
