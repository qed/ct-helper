export type FollowUpPriority = 'high' | 'medium' | 'low'
export type FollowUpStatus = 'pending' | 'completed' | 'overdue'

export interface FollowUp {
  id: string
  contactId: string
  contactName: string
  title: string
  description: string
  dueDate: string
  priority: FollowUpPriority
  status: FollowUpStatus
  assignedTo: string
  createdAt: string
}

export const followUps: FollowUp[] = [
  {
    id: 'f1',
    contactId: 'c6',
    contactName: 'David Okonkwo',
    title: 'Submit United Way funding proposal',
    description: 'Complete and submit proposal for housing navigation program funding. Budget worksheet needed.',
    dueDate: '2024-02-15',
    priority: 'high',
    status: 'pending',
    assignedTo: 'Maria Santos',
    createdAt: '2024-01-05'
  },
  {
    id: 'f2',
    contactId: 'c5',
    contactName: 'Jennifer Wu',
    title: 'Schedule shelter tour for journalist',
    description: 'Jennifer wants to visit shelter for feature story. Coordinate with shelter staff.',
    dueDate: '2024-02-01',
    priority: 'high',
    status: 'pending',
    assignedTo: 'John Davies',
    createdAt: '2024-01-12'
  },
  {
    id: 'f3',
    contactId: 'c8',
    contactName: 'Robert Kim',
    title: 'Arrange donor site visit',
    description: 'Robert requested a tour of our programs. Schedule visit and prepare impact report.',
    dueDate: '2024-02-10',
    priority: 'medium',
    status: 'pending',
    assignedTo: 'Maria Santos',
    createdAt: '2024-01-02'
  },
  {
    id: 'f4',
    contactId: 'c7',
    contactName: 'Angela Martinez',
    title: 'Follow up on health clinic proposal',
    description: 'Check status of collaboration proposal sent Dec 20. May need to escalate.',
    dueDate: '2024-01-25',
    priority: 'medium',
    status: 'overdue',
    assignedTo: 'John Davies',
    createdAt: '2023-12-20'
  },
  {
    id: 'f5',
    contactId: 'c10',
    contactName: 'James Park',
    title: 'Confirm volunteer list for Feb event',
    description: 'Get final volunteer list and coordinate logistics for neighbourhood outreach.',
    dueDate: '2024-02-05',
    priority: 'low',
    status: 'pending',
    assignedTo: 'Maria Santos',
    createdAt: '2024-01-22'
  }
]

export const priorityColors: Record<FollowUpPriority, string> = {
  high: 'bg-red-100 text-red-700',
  medium: 'bg-ct-gold bg-opacity-20 text-ct-clay',
  low: 'bg-gray-100 text-gray-700'
}

export const statusColors: Record<FollowUpStatus, string> = {
  pending: 'bg-blue-100 text-blue-700',
  completed: 'bg-ct-moss bg-opacity-20 text-ct-moss',
  overdue: 'bg-red-100 text-red-700'
}
