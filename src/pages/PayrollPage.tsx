import { useState } from 'react'
import { StatusBadge } from '../components/StatusBadge'
import { mockPayrollRecords } from '../data/mockData'
import type { PayrollRecord } from '../types'

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount)
}

export function PayrollPage() {
  const [records, setRecords] = useState<PayrollRecord[]>(mockPayrollRecords)
  const [selectedPeriod, setSelectedPeriod] = useState('March 2026')

  const periods = [...new Set(mockPayrollRecords.map((r) => r.period))]
  const filtered = records.filter((r) => r.period === selectedPeriod)

  const totalGross = filtered.reduce((sum, r) => sum + r.grossSalary, 0)
  const totalDeductions = filtered.reduce((sum, r) => sum + r.deductions, 0)
  const totalNet = filtered.reduce((sum, r) => sum + r.netSalary, 0)

  function handleProcess(id: string) {
    setRecords((prev) =>
      prev.map((r) => (r.id === id && r.status === 'pending' ? { ...r, status: 'processed' } : r)),
    )
  }

  return (
    <div className="page">
      <div className="page__header">
        <div>
          <h1 className="page__title">Payroll</h1>
          <p className="page__subtitle">Process and manage payroll records</p>
        </div>
        <button className="btn btn--primary">Run Payroll</button>
      </div>

      <div className="card">
        <div className="card__toolbar">
          <label htmlFor="period-select" className="label">
            Period:
          </label>
          <select
            id="period-select"
            className="select"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            {periods.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        <div className="summary-row">
          <div className="summary-item">
            <span className="summary-item__label">Total Gross</span>
            <span className="summary-item__value">{formatCurrency(totalGross)}</span>
          </div>
          <div className="summary-item">
            <span className="summary-item__label">Total Deductions</span>
            <span className="summary-item__value">{formatCurrency(totalDeductions)}</span>
          </div>
          <div className="summary-item summary-item--highlight">
            <span className="summary-item__label">Total Net</span>
            <span className="summary-item__value">{formatCurrency(totalNet)}</span>
          </div>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Gross Salary</th>
              <th>Deductions</th>
              <th>Net Salary</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((record) => (
              <tr key={record.id}>
                <td>{record.employeeName}</td>
                <td>{formatCurrency(record.grossSalary)}</td>
                <td>{formatCurrency(record.deductions)}</td>
                <td>{formatCurrency(record.netSalary)}</td>
                <td>
                  <StatusBadge status={record.status} />
                </td>
                <td>
                  {record.status === 'pending' && (
                    <button
                      className="btn btn--sm btn--secondary"
                      onClick={() => handleProcess(record.id)}
                    >
                      Process
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
