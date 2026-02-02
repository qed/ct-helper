import { ReactNode } from 'react'
import Card from '../ui/Card'

interface StatCardProps {
  title: string
  value: number | string
  icon: ReactNode
  trend?: {
    value: number
    isPositive: boolean
  }
  color?: 'navy' | 'gold' | 'teal' | 'moss'
}

export default function StatCard({ title, value, icon, trend, color = 'navy' }: StatCardProps) {
  const colorClasses = {
    navy: 'bg-ct-navy text-white',
    gold: 'bg-ct-gold bg-opacity-20 text-ct-clay',
    teal: 'bg-ct-teal bg-opacity-20 text-ct-teal',
    moss: 'bg-ct-moss bg-opacity-20 text-ct-moss'
  }

  const iconBgClasses = {
    navy: 'bg-white bg-opacity-20',
    gold: 'bg-ct-gold bg-opacity-30',
    teal: 'bg-ct-teal bg-opacity-30',
    moss: 'bg-ct-moss bg-opacity-30'
  }

  return (
    <Card className={`${color === 'navy' ? colorClasses.navy : ''}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className={`text-sm ${color === 'navy' ? 'text-white text-opacity-80' : 'text-gray-500'}`}>
            {title}
          </p>
          <p className={`text-3xl font-bold mt-1 ${color === 'navy' ? 'text-ct-gold' : 'text-ct-navy'}`}>
            {value}
          </p>
          {trend && (
            <p className={`text-sm mt-2 ${trend.isPositive ? 'text-ct-moss' : 'text-red-500'}`}>
              {trend.isPositive ? '+' : ''}{trend.value}% from last month
            </p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${iconBgClasses[color]}`}>
          {icon}
        </div>
      </div>
    </Card>
  )
}
