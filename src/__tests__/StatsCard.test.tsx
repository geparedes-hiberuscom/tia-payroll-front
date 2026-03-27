import { render, screen } from '@testing-library/react'
import { StatsCard } from '../components/StatsCard'

describe('StatsCard', () => {
  it('renders title and value', () => {
    render(<StatsCard title="Total Employees" value={42} icon={<span>👥</span>} />)
    expect(screen.getByText('Total Employees')).toBeInTheDocument()
    expect(screen.getByText('42')).toBeInTheDocument()
  })

  it('renders description when provided', () => {
    render(
      <StatsCard
        title="Employees"
        value={10}
        icon={<span>👥</span>}
        description="8 active"
      />,
    )
    expect(screen.getByText('8 active')).toBeInTheDocument()
  })

  it('does not render description when not provided', () => {
    const { container } = render(
      <StatsCard title="Employees" value={10} icon={<span>👥</span>} />,
    )
    expect(container.querySelector('.stats-card__description')).not.toBeInTheDocument()
  })
})
