export type InteractionType = 'email' | 'phone' | 'meeting' | 'event' | 'donation' | 'letter' | 'other'

export interface Interaction {
  id: string
  contactId: string
  type: InteractionType
  date: string
  notes: string
  staffName: string
}

export const interactions: Interaction[] = [
  {
    id: 'i1',
    contactId: 'c1',
    type: 'meeting',
    date: '2024-01-15',
    notes: 'Met with Sarah to discuss hosting monthly community dinners. She agreed to provide space on Tuesday evenings.',
    staffName: 'Maria Santos'
  },
  {
    id: 'i2',
    contactId: 'c1',
    type: 'donation',
    date: '2023-12-01',
    notes: 'Donated 50 lbs of coffee for winter warming program.',
    staffName: 'John Davies'
  },
  {
    id: 'i3',
    contactId: 'c3',
    type: 'meeting',
    date: '2024-01-20',
    notes: 'Attended shelter funding announcement at City Hall. Councillor Saxe expressed support for our advocacy.',
    staffName: 'Maria Santos'
  },
  {
    id: 'i4',
    contactId: 'c4',
    type: 'event',
    date: '2024-01-18',
    notes: 'MPP Glover spoke at our ODSP awareness event. Great turnout, about 75 attendees.',
    staffName: 'Maria Santos'
  },
  {
    id: 'i5',
    contactId: 'c5',
    type: 'email',
    date: '2024-01-12',
    notes: 'Sent press release about emergency shelter campaign. Jennifer expressed interest in follow-up story.',
    staffName: 'John Davies'
  },
  {
    id: 'i6',
    contactId: 'c6',
    type: 'meeting',
    date: '2024-01-05',
    notes: 'Discussed potential funding for housing navigation program. Will submit proposal by Feb 15.',
    staffName: 'Maria Santos'
  },
  {
    id: 'i7',
    contactId: 'c8',
    type: 'phone',
    date: '2024-01-02',
    notes: 'New Year check-in call. Confirmed continued support for 2024. Interested in site visit.',
    staffName: 'Maria Santos'
  },
  {
    id: 'i8',
    contactId: 'c2',
    type: 'meeting',
    date: '2024-01-08',
    notes: 'Discussed partnership for literacy program. Will provide 200 books and display space.',
    staffName: 'John Davies'
  },
  {
    id: 'i9',
    contactId: 'c10',
    type: 'meeting',
    date: '2024-01-22',
    notes: 'Planning session for neighbourhood outreach. James will coordinate volunteers for Feb event.',
    staffName: 'Maria Santos'
  },
  {
    id: 'i10',
    contactId: 'c7',
    type: 'email',
    date: '2023-12-20',
    notes: 'Sent proposal for health clinic collaboration. Awaiting response from hospital admin.',
    staffName: 'John Davies'
  }
]

export const interactionTypeLabels: Record<InteractionType, string> = {
  email: 'Email',
  phone: 'Phone Call',
  meeting: 'Meeting',
  event: 'Event',
  donation: 'Donation',
  letter: 'Letter',
  other: 'Other'
}

export const interactionTypeIcons: Record<InteractionType, string> = {
  email: 'Mail',
  phone: 'Phone',
  meeting: 'Users',
  event: 'Calendar',
  donation: 'Gift',
  letter: 'FileText',
  other: 'MoreHorizontal'
}
