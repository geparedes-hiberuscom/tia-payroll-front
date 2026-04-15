import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { UserHeader } from './UserHeader';

describe('UserHeader', () => {
  it('renders with required props', () => {
    render(<UserHeader userName="John Doe" userRole="Developer" />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Developer')).toBeInTheDocument();
  });

  it('renders default title', () => {
    render(<UserHeader userName="Jane" userRole="Designer" />);
    expect(screen.getByText('Header con Usuario')).toBeInTheDocument();
  });

  it('renders custom title', () => {
    render(<UserHeader userName="Jane" userRole="Designer" title="Custom Title" />);
    expect(screen.getByText('Custom Title')).toBeInTheDocument();
  });

  it('renders avatar image', () => {
    render(<UserHeader userName="Jane" userRole="Designer" avatarUrl="https://example.com/avatar.jpg" />);
    const img = screen.getByAltText('Jane');
    expect(img).toHaveAttribute('src', 'https://example.com/avatar.jpg');
  });

  it('uses fallback avatar when none provided', () => {
    render(<UserHeader userName="Jane" userRole="Designer" />);
    const img = screen.getByAltText('Jane');
    expect(img).toHaveAttribute('src', 'https://www.figma.com/api/mcp/asset/cc9d8f2e-64b9-4218-bd9a-52ea670ed156');
  });

  it('handles click callback', () => {
    const handleClick = vi.fn();
    render(<UserHeader userName="Jane" userRole="Designer" onUserClick={handleClick} />);
    const button = screen.getByRole('button');
    button.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('accepts custom className', () => {
    const { container } = render(
      <UserHeader userName="Jane" userRole="Designer" className="custom-class" />,
    );
    const section = container.querySelector('section');
    expect(section).toHaveClass('custom-class');
  });
});
