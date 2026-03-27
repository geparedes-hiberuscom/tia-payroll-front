import type { ReactNode } from 'react'

interface StatsCardProps {
  title: string
  value: string | number
  icon: ReactNode
  description?: string
}

export function StatsCard({ title, value, icon, description }: StatsCardProps) {
  return (
    <div className="stats-card">
      <div className="stats-card__icon">{icon}</div>
      <div className="stats-card__content">
        <p className="stats-card__title">{title}</p>
        <p className="stats-card__value">{value}</p>
        {description && <p className="stats-card__description">{description}</p>}
      </div>
    </div>
  )
}
