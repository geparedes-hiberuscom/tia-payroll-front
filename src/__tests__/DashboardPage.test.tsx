import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { DashboardPage } from '../pages/DashboardPage'

describe('DashboardPage', () => {
  it('renders the dashboard title', () => {
    render(
      <MemoryRouter>
        <DashboardPage />
      </MemoryRouter>,
    )
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
  })

  it('renders stats cards', () => {
    render(
      <MemoryRouter>
        <DashboardPage />
      </MemoryRouter>,
    )
    expect(screen.getByText('Total Employees')).toBeInTheDocument()
    expect(screen.getByText('Active Employees')).toBeInTheDocument()
    expect(screen.getByText('Annual Payroll')).toBeInTheDocument()
    expect(screen.getByText('Pending Payrolls')).toBeInTheDocument()
  })

  it('renders recent payroll activity section', () => {
    render(
      <MemoryRouter>
        <DashboardPage />
      </MemoryRouter>,
    )
    expect(screen.getByText('Recent Payroll Activity')).toBeInTheDocument()
  })
})
