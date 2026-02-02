import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Bell, CheckCircle, Calendar, User, AlertCircle } from 'lucide-react'
import { followUps as mockFollowUps, FollowUp } from '../data/followUps'
import { Card, CardContent } from '../components/ui/Card'
import { useLocalStorage } from '../hooks/useLocalStorage'

type FilterStatus = 'all' | 'pending' | 'overdue' | 'completed'

export default function FollowUps() {
  const [filter, setFilter] = useState<FilterStatus>('all')
  const [completedIds, setCompletedIds] = useLocalStorage<string[]>('ct-completed-followups', [])

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
  const completedCount = followUpsWithStatus.filter(fu => fu.status === 'completed').length

  const filters: { value: FilterStatus; label: string; count?: number }[] = [
    { value: 'all', label: 'All' },
    { value: 'pending', label: 'Pending', count: pendingCount },
    { value: 'overdue', label: 'Overdue', count: overdueCount },
    { value: 'completed', label: 'Completed' }
  ]

  const priorityColors = {
    high: 'bg-red-100 text-red-700 border-red-200',
    medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    low: 'bg-blue-100 text-blue-700 border-blue-200'
  }

  const statusColors = {
    pending: 'bg-blue-100 text-blue-700 border-blue-200',
    overdue: 'bg-red-100 text-red-700 border-red-200',
    completed: 'bg-green-100 text-green-700 border-green-200'
  }

  return (
    <div className="space-y-6">
      <Link
        to="/crm"
        className="inline-flex items-center gap-2 text-text-secondary hover:text-primary text-sm font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to CRM
      </Link>

      <div className="flex items-center gap-3">
        <Bell className="w-8 h-8 text-primary" />
        <div>
          <h1 className="font-serif text-2xl font-bold text-primary">Follow-ups</h1>
          <p className="text-text-secondary">Tasks and reminders for your contacts</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">{followUpsWithStatus.length}</div>
            <div className="text-sm text-text-secondary">Total</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{pendingCount}</div>
            <div className="text-sm text-text-secondary">Pending</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">{overdueCount}</div>
            <div className="text-sm text-text-secondary">Overdue</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{completedCount}</div>
            <div className="text-sm text-text-secondary">Completed</div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-4 py-2 rounded-full font-medium transition-colors min-h-[44px] flex items-center gap-2 ${
              filter === f.value
                ? 'bg-primary text-white'
                : 'bg-white text-text-primary border border-gray-200 hover:border-primary'
            }`}
          >
            {f.label}
            {f.count !== undefined && f.count > 0 && (
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                filter === f.value ? 'bg-white text-primary' : 'bg-primary text-white'
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
          {filteredFollowUps.map((followUp) => {
            const isOverdue = followUp.status === 'overdue' ||
              (followUp.status === 'pending' && new Date(followUp.dueDate) < new Date())

            return (
              <Card
                key={followUp.id}
                className={isOverdue && followUp.status !== 'completed' ? 'border-l-4 border-l-red-500' : ''}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${priorityColors[followUp.priority]}`}>
                          {followUp.priority}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${statusColors[followUp.status]}`}>
                          {followUp.status}
                        </span>
                        {isOverdue && followUp.status !== 'overdue' && followUp.status !== 'completed' && (
                          <AlertCircle className="w-4 h-4 text-red-500" />
                        )}
                      </div>

                      <h3 className="font-bold text-text-primary mb-1">{followUp.title}</h3>
                      <p className="text-sm text-text-secondary mb-3">{followUp.description}</p>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary">
                        <Link
                          to={`/crm/contacts/${followUp.contactId}`}
                          className="flex items-center gap-1 text-primary hover:underline"
                        >
                          <User className="w-4 h-4" />
                          {followUp.contactName}
                        </Link>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Due: {new Date(followUp.dueDate).toLocaleDateString()}
                        </div>
                        <div>
                          Assigned: {followUp.assignedTo}
                        </div>
                      </div>
                    </div>

                    {followUp.status !== 'completed' && (
                      <button
                        onClick={() => handleComplete(followUp.id)}
                        className="px-4 py-2 text-sm font-medium text-secondary bg-secondary/10 rounded-lg hover:bg-secondary/20 transition-colors min-h-[44px]"
                      >
                        Mark Done
                      </button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : (
        <Card className="text-center py-12">
          <CardContent>
            <CheckCircle className="w-12 h-12 text-secondary mx-auto mb-4" />
            <p className="text-text-secondary">No follow-ups in this category.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
