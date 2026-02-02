import { Navigate, Link } from 'react-router-dom'
import { ArrowRight, Mail, MessageSquare, CheckCircle, Building2, Landmark } from 'lucide-react'
import { useAppContext } from '../App'
import {
  dashboardStats,
  campaignBreakdown,
  monthlyActivity,
  recentActivity
} from '../data/dashboardStats'
import PageContainer from '../components/layout/PageContainer'
import Card from '../components/ui/Card'
import StatsGrid from '../components/dashboard/StatsGrid'
import SimpleChart from '../components/dashboard/SimpleChart'

export default function Dashboard() {
  const { isLoggedIn } = useAppContext()

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />
  }

  const activityIcons = {
    letter: Mail,
    interaction: MessageSquare,
    'follow-up': CheckCircle
  }

  const activityColors = {
    letter: 'bg-ct-navy text-ct-gold',
    interaction: 'bg-ct-teal bg-opacity-20 text-ct-teal',
    'follow-up': 'bg-ct-moss bg-opacity-20 text-ct-moss'
  }

  const levelIcons = {
    municipal: Building2,
    provincial: Landmark,
    federal: Landmark
  }

  return (
    <div className="bg-white/95 min-h-screen">
    <PageContainer>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-ct-navy">Dashboard</h1>
        <p className="text-gray-600">Overview of advocacy and relationship management</p>
      </div>

      {/* Stats Grid */}
      <div className="mb-8">
        <StatsGrid stats={dashboardStats} />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Chart */}
        <div className="lg:col-span-2">
          <SimpleChart data={monthlyActivity} title="Activity Over Time" />
        </div>

        {/* Campaign Breakdown */}
        <div>
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-ct-navy">Campaign Performance</h3>
              <Link to="/campaigns" className="text-ct-teal text-sm hover:underline flex items-center gap-1">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="space-y-4">
              {campaignBreakdown.map((campaign) => {
                const LevelIcon = levelIcons[campaign.level]
                const percentage = Math.round((campaign.lettersSent / dashboardStats.totalLettersSent) * 100)

                return (
                  <div key={campaign.id}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <div className="flex items-center gap-2">
                        <LevelIcon className="w-4 h-4 text-gray-400" />
                        <span className="font-medium text-ct-navy truncate">
                          {campaign.title}
                        </span>
                      </div>
                      <span className="text-gray-500">{campaign.lettersSent}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-ct-teal rounded-full h-2 transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-4 pt-4 border-t text-center">
              <p className="text-2xl font-bold text-ct-gold">{dashboardStats.totalLettersSent}</p>
              <p className="text-sm text-gray-500">Total letters sent</p>
            </div>
          </Card>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-ct-navy">Recent Activity</h3>
          </div>

          <div className="divide-y">
            {recentActivity.map((activity) => {
              const Icon = activityIcons[activity.type]
              return (
                <div key={activity.id} className="py-3 flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activityColors[activity.type]}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-700">{activity.description}</p>
                    <p className="text-sm text-gray-400">
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
        </Card>
      </div>
    </PageContainer>
    </div>
  )
}
