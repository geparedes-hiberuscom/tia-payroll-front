import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { PayrollPage } from '../pages/PayrollPage'

function renderWithRouter(ui: React.ReactElement) {
  return render(<MemoryRouter>{ui}</MemoryRouter>)
}

describe('PayrollPage', () => {
  it('renders the page title', () => {
    renderWithRouter(<PayrollPage />)
    expect(screen.getByText('Payroll')).toBeInTheDocument()
  })

  it('renders payroll records', () => {
    renderWithRouter(<PayrollPage />)
    expect(screen.getByText('Ana García')).toBeInTheDocument()
    expect(screen.getByText('Carlos Martínez')).toBeInTheDocument()
  })

  it('renders the Run Payroll button', () => {
    renderWithRouter(<PayrollPage />)
    expect(screen.getByText('Run Payroll')).toBeInTheDocument()
  })

  it('processes a pending payroll record', () => {
    renderWithRouter(<PayrollPage />)
    const processButtons = screen.getAllByText('Process')
    expect(processButtons.length).toBeGreaterThan(0)
    fireEvent.click(processButtons[0])
    expect(screen.getAllByText('Process').length).toBeLessThan(processButtons.length)
  })

  it('renders summary totals', () => {
    renderWithRouter(<PayrollPage />)
    expect(screen.getByText('Total Gross')).toBeInTheDocument()
    expect(screen.getByText('Total Deductions')).toBeInTheDocument()
    expect(screen.getByText('Total Net')).toBeInTheDocument()
  })
})
