import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { ArrowLeft, Bell, CheckCircle } from 'lucide-react'
import { useAppContext } from '../App'
import { followUps as mockFollowUps, FollowUp } from '../data/followUps'
import PageContainer from '../components/layout/PageContainer'
import FollowUpItem from '../components/crm/FollowUpItem'
import { useLocalStorage } from '../hooks/useLocalStorage'

type FilterStatus = 'all' | 'pending' | 'overdue' | 'completed'

export default function FollowUps() {
  const { isLoggedIn } = useAppContext()
  const [filter, setFilter] = useState<FilterStatus>('all')
  const [completedIds, setCompletedIds] = useLocalStorage<string[]>('ct-completed-followups', [])

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />
  }

  const handleComplete = (id: string) => {
    setCompletedIds([...completedIds, id])
  }

  // Apply completed status to mock data
  const followUpsWithStatus: FollowUp[] = mockFollowUps.map(fu => ({
    ...fu,
    status: completedIds.includes(fu.id) ? 'completed' : fu.status
  }))

  const filteredFollowUps = followUpsWithStatus.filter(fu => {
    if (filter === 'all') return true
    return fu.status === filter
  })

  const overdueCount = followUpsWithStatus.filter(fu =>
    fu.status === 'overdue' ||
    (fu.status === 'pending' && new Date(fu.dueDate) < new Date())
  ).length

  const pendingCount = followUpsWithStatus.filter(fu => fu.status === 'pending').length

  const filters: { value: FilterStatus; label: string; count?: number }[] = [
    { value: 'all', label: 'All' },
    { value: 'pending', label: 'Pending', count: pendingCount },
    { value: 'overdue', label: 'Overdue', count: overdueCount },
    { value: 'completed', label: 'Completed' }
  ]

  return (
    <div className="bg-white/95 min-h-screen">
    <PageContainer>
      <Link
        to="/crm"
        className="inline-flex items-center gap-2 text-ct-teal hover:underline mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to CRM
      </Link>

      <div className="flex items-center gap-3 mb-6">
        <Bell className="w-8 h-8 text-ct-navy" />
        <div>
          <h1 className="text-3xl font-bold text-ct-navy">Follow-ups</h1>
          <p className="text-gray-600">Tasks and reminders for your contacts</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="text-2xl font-bold text-ct-navy">{followUpsWithStatus.length}</div>
          <div className="text-sm text-gray-500">Total</div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="text-2xl font-bold text-blue-600">{pendingCount}</div>
          <div className="text-sm text-gray-500">Pending</div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="text-2xl font-bold text-red-600">{overdueCount}</div>
          <div className="text-sm text-gray-500">Overdue</div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="text-2xl font-bold text-ct-moss">
            {followUpsWithStatus.filter(fu => fu.status === 'completed').length}
          </div>
          <div className="text-sm text-gray-500">Completed</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-4 py-2 rounded-full font-medium transition-colors min-h-[44px] flex items-center gap-2 ${
              filter === f.value
                ? 'bg-ct-navy text-white'
                : 'bg-white text-ct-navy hover:bg-gray-100'
            }`}
          >
            {f.label}
            {f.count !== undefined && f.count > 0 && (
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                filter === f.value ? 'bg-white text-ct-navy' : 'bg-ct-navy text-white'
              }`}>
                {f.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Follow-up List */}
      {filteredFollowUps.length > 0 ? (
        <div className="space-y-4">
          {filteredFollowUps.map((followUp) => (
            <FollowUpItem
              key={followUp.id}
              followUp={followUp}
              onComplete={followUp.status !== 'completed' ? handleComplete : undefined}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl">
          <CheckCircle className="w-12 h-12 text-ct-moss mx-auto mb-4" />
          <p className="text-gray-500">No follow-ups in this category.</p>
        </div>
      )}
    </PageContainer>
    </div>
  )
}
