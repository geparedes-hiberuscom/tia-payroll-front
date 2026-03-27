import { mockEmployees, mockPayrollRecords } from '../data/mockData'

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount)
}

export function ReportsPage() {
  const departmentSummary = mockEmployees.reduce<
    Record<string, { count: number; totalSalary: number }>
  >((acc, emp) => {
    const dept = emp.department
    if (!acc[dept]) {
      acc[dept] = { count: 0, totalSalary: 0 }
    }
    acc[dept].count++
    acc[dept].totalSalary += emp.salary
    return acc
  }, {})

  const payrollSummary = {
    totalGross: mockPayrollRecords.reduce((sum, r) => sum + r.grossSalary, 0),
    totalDeductions: mockPayrollRecords.reduce((sum, r) => sum + r.deductions, 0),
    totalNet: mockPayrollRecords.reduce((sum, r) => sum + r.netSalary, 0),
    paid: mockPayrollRecords.filter((r) => r.status === 'paid').length,
    pending: mockPayrollRecords.filter((r) => r.status === 'pending').length,
  }

  return (
    <div className="page">
      <div className="page__header">
        <div>
          <h1 className="page__title">Reports</h1>
          <p className="page__subtitle">Payroll and workforce analytics</p>
        </div>
        <button className="btn btn--secondary">Export Report</button>
      </div>

      <div className="reports-grid">
        <div className="card">
          <div className="card__header">
            <h2 className="card__title">Payroll Summary – March 2026</h2>
          </div>
          <div className="report-stats">
            <div className="report-stat">
              <span className="report-stat__label">Total Gross</span>
              <span className="report-stat__value">{formatCurrency(payrollSummary.totalGross)}</span>
            </div>
            <div className="report-stat">
              <span className="report-stat__label">Total Deductions</span>
              <span className="report-stat__value">{formatCurrency(payrollSummary.totalDeductions)}</span>
            </div>
            <div className="report-stat report-stat--highlight">
              <span className="report-stat__label">Total Net Paid</span>
              <span className="report-stat__value">{formatCurrency(payrollSummary.totalNet)}</span>
            </div>
            <div className="report-stat">
              <span className="report-stat__label">Paid Records</span>
              <span className="report-stat__value">{payrollSummary.paid}</span>
            </div>
            <div className="report-stat">
              <span className="report-stat__label">Pending Records</span>
              <span className="report-stat__value">{payrollSummary.pending}</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card__header">
            <h2 className="card__title">Headcount by Department</h2>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Department</th>
                <th>Employees</th>
                <th>Total Annual Salary</th>
                <th>Avg Salary</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(departmentSummary).map(([dept, data]) => (
                <tr key={dept}>
                  <td>{dept}</td>
                  <td>{data.count}</td>
                  <td>{formatCurrency(data.totalSalary)}</td>
                  <td>{formatCurrency(data.totalSalary / data.count)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
