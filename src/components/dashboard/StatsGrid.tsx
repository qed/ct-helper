import { Mail, Users, Megaphone, UserPlus, MessageSquare, Bell } from 'lucide-react'
import { DashboardStats } from '../../data/dashboardStats'
import StatCard from './StatCard'

interface StatsGridProps {
  stats: DashboardStats
}

export default function StatsGrid({ stats }: StatsGridProps) {
  const statItems = [
    {
      title: 'Total Letters Sent',
      value: stats.totalLettersSent,
      icon: <Mail className="w-6 h-6 text-ct-gold" />,
      color: 'navy' as const,
      trend: { value: 23, isPositive: true }
    },
    {
      title: 'Unique Supporters',
      value: stats.uniqueSupporters,
      icon: <Users className="w-6 h-6 text-ct-teal" />,
      color: 'teal' as const,
      trend: { value: 12, isPositive: true }
    },
    {
      title: 'Active Campaigns',
      value: stats.activeCampaigns,
      icon: <Megaphone className="w-6 h-6 text-ct-clay" />,
      color: 'gold' as const
    },
    {
      title: 'Contacts in CRM',
      value: stats.contactsInCRM,
      icon: <UserPlus className="w-6 h-6 text-ct-moss" />,
      color: 'moss' as const
    },
    {
      title: 'Interactions This Month',
      value: stats.interactionsThisMonth,
      icon: <MessageSquare className="w-6 h-6 text-ct-teal" />,
      color: 'teal' as const
    },
    {
      title: 'Follow-ups Due',
      value: stats.followUpsDue,
      icon: <Bell className="w-6 h-6 text-ct-clay" />,
      color: 'gold' as const
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {statItems.map((stat) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          color={stat.color}
          trend={stat.trend}
        />
      ))}
    </div>
  )
}
