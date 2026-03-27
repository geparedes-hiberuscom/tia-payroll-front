import { StatsCard } from '../components/StatsCard'
import { mockDashboardStats, mockPayrollRecords } from '../data/mockData'

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount)
}

export function DashboardPage() {
  const recentPayrolls = mockPayrollRecords.slice(0, 3)

  return (
    <div className="page">
      <div className="page__header">
        <h1 className="page__title">Dashboard</h1>
        <p className="page__subtitle">Welcome to TIA Payroll Management</p>
      </div>

      <div className="stats-grid">
        <StatsCard
          title="Total Employees"
          value={mockDashboardStats.totalEmployees}
          icon={<span>👥</span>}
          description={`${mockDashboardStats.activeEmployees} active`}
        />
        <StatsCard
          title="Active Employees"
          value={mockDashboardStats.activeEmployees}
          icon={<span>✅</span>}
        />
        <StatsCard
          title="Annual Payroll"
          value={formatCurrency(mockDashboardStats.totalPayroll)}
          icon={<span>💰</span>}
        />
        <StatsCard
          title="Pending Payrolls"
          value={mockDashboardStats.pendingPayrolls}
          icon={<span>⏳</span>}
          description="Awaiting processing"
        />
      </div>

      <div className="card">
        <div className="card__header">
          <h2 className="card__title">Recent Payroll Activity</h2>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Period</th>
              <th>Net Salary</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentPayrolls.map((record) => (
              <tr key={record.id}>
                <td>{record.employeeName}</td>
                <td>{record.period}</td>
                <td>{formatCurrency(record.netSalary)}</td>
                <td>
                  <span className={`badge badge--${record.status === 'paid' ? 'success' : record.status === 'processed' ? 'info' : 'warning'}`}>
                    {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
