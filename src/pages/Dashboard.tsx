import { Link } from 'react-router-dom'
import { ArrowRight, Mail, Users, Megaphone, UserPlus, MessageSquare, Bell, Send, Building2, Landmark, CheckCircle } from 'lucide-react'
import {
  dashboardStats,
  campaignBreakdown,
  monthlyActivity,
  recentActivity
} from '../data/dashboardStats'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'

export default function Dashboard() {
  const activityIcons = {
    letter: Mail,
    interaction: MessageSquare,
    'follow-up': CheckCircle
  }

  const activityColors = {
    letter: 'bg-primary/20 text-primary',
    interaction: 'bg-secondary/20 text-secondary',
    'follow-up': 'bg-green-100 text-green-600'
  }

  const levelIcons = {
    municipal: Building2,
    provincial: Landmark,
    federal: Landmark
  }

  const statItems = [
    {
      title: 'Letters Sent',
      value: dashboardStats.totalLettersSent,
      icon: Send,
      subtext: '+23% from last month'
    },
    {
      title: 'Supporters Mobilized',
      value: dashboardStats.uniqueSupporters,
      icon: Users,
      subtext: `${dashboardStats.uniqueSupporters} unique senders`
    },
    {
      title: 'Active Campaigns',
      value: dashboardStats.activeCampaigns,
      icon: Megaphone,
      subtext: '1 ending soon'
    },
    {
      title: 'CRM Contacts',
      value: dashboardStats.contactsInCRM,
      icon: UserPlus,
      subtext: `${dashboardStats.contactsInCRM} total records`
    },
    {
      title: 'Interactions This Month',
      value: dashboardStats.interactionsThisMonth,
      icon: MessageSquare,
      subtext: '+12% from last month'
    },
    {
      title: 'Follow-ups Due',
      value: dashboardStats.followUpsDue,
      icon: Bell,
      subtext: 'Action required'
    }
  ]

  const maxActivity = Math.max(
    ...monthlyActivity.map(d => Math.max(d.letters, d.interactions))
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-serif text-2xl font-bold text-text-primary mb-2">
          Impact Overview
        </h1>
        <p className="text-text-secondary">
          Track advocacy efforts and community engagement.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statItems.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-text-secondary">
                  {stat.title}
                </span>
                <div className="p-2 bg-primary/10 rounded-full text-primary">
                  <stat.icon size={20} />
                </div>
              </div>
              <div className="text-3xl font-bold text-text-primary mb-1">{stat.value}</div>
              <p className="text-xs text-text-light">{stat.subtext}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Activity Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2 h-48">
              {monthlyActivity.map((item) => (
                <div key={item.month} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex gap-1 items-end" style={{ height: '160px' }}>
                    <div
                      className="flex-1 bg-primary rounded-t transition-all duration-300"
                      style={{ height: `${(item.letters / maxActivity) * 100}%` }}
                      title={`Letters: ${item.letters}`}
                    />
                    <div
                      className="flex-1 bg-secondary rounded-t transition-all duration-300"
                      style={{ height: `${(item.interactions / maxActivity) * 100}%` }}
                      title={`Interactions: ${item.interactions}`}
                    />
                  </div>
                  <span className="text-xs text-text-light">{item.month}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-6 mt-4 pt-4 border-t">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary rounded" />
                <span className="text-sm text-text-secondary">Letters</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-secondary rounded" />
                <span className="text-sm text-text-secondary">Interactions</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Campaign Performance */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Campaign Performance</CardTitle>
              <Link
                to="/campaigns"
                className="text-sm text-primary hover:underline flex items-center gap-1"
              >
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {campaignBreakdown.map((campaign) => {
                const LevelIcon = levelIcons[campaign.level]
                const percentage = Math.round((campaign.lettersSent / dashboardStats.totalLettersSent) * 100)

                return (
                  <div key={campaign.id}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <div className="flex items-center gap-2">
                        <LevelIcon className="w-4 h-4 text-text-light" />
                        <span className="font-medium text-text-primary truncate">
                          {campaign.title}
                        </span>
                      </div>
                      <span className="text-text-secondary">{campaign.lettersSent}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary rounded-full h-2 transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-4 pt-4 border-t text-center">
              <p className="text-2xl font-bold text-accent">{dashboardStats.totalLettersSent}</p>
              <p className="text-sm text-text-secondary">Total letters sent</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row: Recent Activity + Follow-ups */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="divide-y">
              {recentActivity.map((activity) => {
                const Icon = activityIcons[activity.type]
                return (
                  <div key={activity.id} className="py-3 flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activityColors[activity.type]}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-text-primary">{activity.description}</p>
                      <p className="text-sm text-text-light">
                        {new Date(activity.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Follow-ups Due */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Follow-ups Due</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Sarah Chen', task: 'Confirm pastry pickup', date: 'Today' },
                { name: 'Councillor Saxe', task: 'Send impact report', date: 'Tomorrow' },
                { name: 'James Park', task: 'Volunteer coordination', date: 'Feb 5' }
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 bg-background rounded-md border border-gray-100"
                >
                  <div className="w-1 h-full bg-accent rounded-full" />
                  <div>
                    <p className="font-medium text-sm text-text-primary">{item.name}</p>
                    <p className="text-xs text-text-secondary mb-1">{item.task}</p>
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wide">
                      {item.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/crm/follow-ups" className="block mt-6">
              <Button variant="outline" fullWidth size="sm">
                View All Tasks
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
