import { Link } from 'react-router-dom'
import { Calendar, User, AlertCircle } from 'lucide-react'
import { FollowUp, priorityColors, statusColors } from '../../data/followUps'
import Card from '../ui/Card'

interface FollowUpItemProps {
  followUp: FollowUp
  onComplete?: (id: string) => void
}

export default function FollowUpItem({ followUp, onComplete }: FollowUpItemProps) {
  const isOverdue = followUp.status === 'overdue' ||
    (followUp.status === 'pending' && new Date(followUp.dueDate) < new Date())

  return (
    <Card className={`${isOverdue ? 'border-l-4 border-red-500' : ''}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${priorityColors[followUp.priority]}`}>
              {followUp.priority}
            </span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[followUp.status]}`}>
              {followUp.status}
            </span>
            {isOverdue && followUp.status !== 'overdue' && (
              <AlertCircle className="w-4 h-4 text-red-500" />
            )}
          </div>

          <h3 className="font-bold text-ct-navy mb-1">{followUp.title}</h3>
          <p className="text-sm text-gray-600 mb-3">{followUp.description}</p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <Link
              to={`/crm/contacts/${followUp.contactId}`}
              className="flex items-center gap-1 text-ct-teal hover:underline"
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

        {followUp.status !== 'completed' && onComplete && (
          <button
            onClick={() => onComplete(followUp.id)}
            className="px-4 py-2 text-sm font-medium text-ct-moss bg-ct-moss bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-colors min-h-[44px]"
          >
            Mark Done
          </button>
        )}
      </div>
    </Card>
  )
}
