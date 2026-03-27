import { useState } from 'react'
import { StatusBadge } from '../components/StatusBadge'
import { mockEmployees } from '../data/mockData'
import type { Employee } from '../types'

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount)
}

export function EmployeesPage() {
  const [search, setSearch] = useState('')
  const [employees] = useState<Employee[]>(mockEmployees)

  const filtered = employees.filter(
    (emp) =>
      `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
      emp.email.toLowerCase().includes(search.toLowerCase()) ||
      emp.department.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="page">
      <div className="page__header">
        <div>
          <h1 className="page__title">Employees</h1>
          <p className="page__subtitle">Manage your organization's employees</p>
        </div>
        <button className="btn btn--primary">+ Add Employee</button>
      </div>

      <div className="card">
        <div className="card__toolbar">
          <input
            type="search"
            placeholder="Search employees..."
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search employees"
          />
          <span className="text-muted">{filtered.length} employees found</span>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Position</th>
              <th>Salary</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="table__empty">
                  No employees found
                </td>
              </tr>
            ) : (
              filtered.map((emp) => (
                <tr key={emp.id}>
                  <td className="table__name">
                    {emp.firstName} {emp.lastName}
                  </td>
                  <td>{emp.email}</td>
                  <td>{emp.department}</td>
                  <td>{emp.position}</td>
                  <td>{formatCurrency(emp.salary)}</td>
                  <td>
                    <StatusBadge status={emp.status} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
