export interface Employee {
  id: string
  firstName: string
  lastName: string
  email: string
  department: string
  position: string
  salary: number
  startDate: string
  status: 'active' | 'inactive'
}

export interface PayrollRecord {
  id: string
  employeeId: string
  employeeName: string
  period: string
  grossSalary: number
  deductions: number
  netSalary: number
  status: 'pending' | 'processed' | 'paid'
  processedDate?: string
}

export interface Department {
  id: string
  name: string
  headcount: number
  totalSalary: number
}

export interface DashboardStats {
  totalEmployees: number
  activeEmployees: number
  totalPayroll: number
  pendingPayrolls: number
}
