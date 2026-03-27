import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { EmployeesPage } from '../pages/EmployeesPage'

function renderWithRouter(ui: React.ReactElement) {
  return render(<MemoryRouter>{ui}</MemoryRouter>)
}

describe('EmployeesPage', () => {
  it('renders the page title', () => {
    renderWithRouter(<EmployeesPage />)
    expect(screen.getByText('Employees')).toBeInTheDocument()
  })

  it('renders all employees initially', () => {
    renderWithRouter(<EmployeesPage />)
    expect(screen.getByText('Ana García')).toBeInTheDocument()
    expect(screen.getByText('Carlos Martínez')).toBeInTheDocument()
    expect(screen.getByText('Laura López')).toBeInTheDocument()
  })

  it('filters employees by search term', () => {
    renderWithRouter(<EmployeesPage />)
    const searchInput = screen.getByLabelText('Search employees')
    fireEvent.change(searchInput, { target: { value: 'Ana' } })
    expect(screen.getByText('Ana García')).toBeInTheDocument()
    expect(screen.queryByText('Carlos Martínez')).not.toBeInTheDocument()
  })

  it('shows no results message when search has no matches', () => {
    renderWithRouter(<EmployeesPage />)
    const searchInput = screen.getByLabelText('Search employees')
    fireEvent.change(searchInput, { target: { value: 'zzznomatch' } })
    expect(screen.getByText('No employees found')).toBeInTheDocument()
  })

  it('shows employee count', () => {
    renderWithRouter(<EmployeesPage />)
    expect(screen.getByText(/employees found/)).toBeInTheDocument()
  })
})
