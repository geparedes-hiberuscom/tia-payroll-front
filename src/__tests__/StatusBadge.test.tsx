import { render, screen } from '@testing-library/react'
import { StatusBadge } from '../components/StatusBadge'

describe('StatusBadge', () => {
  it('renders Active badge for active status', () => {
    render(<StatusBadge status="active" />)
    expect(screen.getByText('Active')).toBeInTheDocument()
    expect(screen.getByText('Active')).toHaveClass('badge--success')
  })

  it('renders Inactive badge for inactive status', () => {
    render(<StatusBadge status="inactive" />)
    expect(screen.getByText('Inactive')).toBeInTheDocument()
    expect(screen.getByText('Inactive')).toHaveClass('badge--neutral')
  })

  it('renders Pending badge for pending status', () => {
    render(<StatusBadge status="pending" />)
    expect(screen.getByText('Pending')).toBeInTheDocument()
    expect(screen.getByText('Pending')).toHaveClass('badge--warning')
  })

  it('renders Paid badge for paid status', () => {
    render(<StatusBadge status="paid" />)
    expect(screen.getByText('Paid')).toBeInTheDocument()
    expect(screen.getByText('Paid')).toHaveClass('badge--success')
  })

  it('renders Processed badge for processed status', () => {
    render(<StatusBadge status="processed" />)
    expect(screen.getByText('Processed')).toBeInTheDocument()
    expect(screen.getByText('Processed')).toHaveClass('badge--info')
  })

  it('renders raw status for unknown status', () => {
    render(<StatusBadge status="unknown-status" />)
    expect(screen.getByText('unknown-status')).toBeInTheDocument()
    expect(screen.getByText('unknown-status')).toHaveClass('badge--neutral')
  })
})
