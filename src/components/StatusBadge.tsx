interface StatusBadgeProps {
  status: string
}

const statusConfig: Record<string, { label: string; className: string }> = {
  active: { label: 'Active', className: 'badge--success' },
  inactive: { label: 'Inactive', className: 'badge--neutral' },
  pending: { label: 'Pending', className: 'badge--warning' },
  processed: { label: 'Processed', className: 'badge--info' },
  paid: { label: 'Paid', className: 'badge--success' },
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status] ?? { label: status, className: 'badge--neutral' }
  return <span className={`badge ${config.className}`}>{config.label}</span>
}
