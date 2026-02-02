export type ContactType = 'business' | 'politician' | 'media' | 'partner' | 'donor'

export interface Contact {
  id: string
  name: string
  organization: string
  type: ContactType
  email: string
  phone?: string
  address?: string
  notes?: string
  tags: string[]
  lastInteraction?: string
  createdAt: string
}

export const contacts: Contact[] = [
  {
    id: 'c1',
    name: 'Sarah Chen',
    organization: 'Bloor Street Café',
    type: 'business',
    email: 'sarah@bloorstreetcafe.ca',
    phone: '416-555-0101',
    address: '342 Bloor St W, Toronto',
    notes: 'Interested in hosting community events. Has donated coffee for past events.',
    tags: ['food-donor', 'event-space', 'local-business'],
    lastInteraction: '2024-01-15',
    createdAt: '2023-06-12'
  },
  {
    id: 'c2',
    name: 'Michael Rodriguez',
    organization: 'Bay Street Books',
    type: 'business',
    email: 'mike@baystreetbooks.com',
    phone: '416-555-0102',
    address: '156 Bay St, Toronto',
    notes: 'Provides space for book drives. Open to literacy program partnership.',
    tags: ['local-business', 'literacy', 'community-partner'],
    lastInteraction: '2024-01-08',
    createdAt: '2023-08-20'
  },
  {
    id: 'c3',
    name: 'Councillor Dianne Saxe',
    organization: 'Ward 11 - University-Rosedale',
    type: 'politician',
    email: 'councillor_saxe@toronto.ca',
    phone: '416-392-4009',
    address: 'Toronto City Hall',
    notes: 'Supportive of homelessness initiatives. Met at shelter funding announcement.',
    tags: ['municipal', 'housing', 'supportive'],
    lastInteraction: '2024-01-20',
    createdAt: '2023-03-15'
  },
  {
    id: 'c4',
    name: 'MPP Chris Glover',
    organization: 'Spadina-Fort York',
    type: 'politician',
    email: 'cglover-qp@ndp.on.ca',
    phone: '416-603-9664',
    notes: 'Strong advocate for ODSP increases. Has spoken at our events.',
    tags: ['provincial', 'odsp', 'ally'],
    lastInteraction: '2024-01-18',
    createdAt: '2023-02-10'
  },
  {
    id: 'c5',
    name: 'Jennifer Wu',
    organization: 'Toronto Star',
    type: 'media',
    email: 'jwu@thestar.ca',
    phone: '416-555-0105',
    notes: 'Covers homelessness and social services. Open to story pitches.',
    tags: ['journalist', 'homelessness', 'responsive'],
    lastInteraction: '2024-01-12',
    createdAt: '2023-09-05'
  },
  {
    id: 'c6',
    name: 'David Okonkwo',
    organization: 'United Way Greater Toronto',
    type: 'partner',
    email: 'dokonkwo@uwgt.org',
    phone: '416-555-0106',
    notes: 'Program coordinator for community services. Potential funding partner.',
    tags: ['funder', 'community-services', 'collaboration'],
    lastInteraction: '2024-01-05',
    createdAt: '2023-04-22'
  },
  {
    id: 'c7',
    name: 'Angela Martinez',
    organization: 'St. Michael\'s Hospital',
    type: 'partner',
    email: 'martineza@smh.ca',
    phone: '416-555-0107',
    notes: 'Works in community health outreach. Interested in health clinic collaboration.',
    tags: ['healthcare', 'outreach', 'potential-partner'],
    lastInteraction: '2023-12-20',
    createdAt: '2023-07-18'
  },
  {
    id: 'c8',
    name: 'Robert Kim',
    organization: 'Kim Family Foundation',
    type: 'donor',
    email: 'rkim@kimfoundation.org',
    phone: '416-555-0108',
    notes: 'Major donor interested in housing programs. Annual contribution.',
    tags: ['major-donor', 'housing', 'annual'],
    lastInteraction: '2024-01-02',
    createdAt: '2022-11-30'
  },
  {
    id: 'c9',
    name: 'Lisa Thompson',
    organization: 'CBC Toronto',
    type: 'media',
    email: 'lisa.thompson@cbc.ca',
    phone: '416-555-0109',
    notes: 'Radio producer for Metro Morning. Has featured our work before.',
    tags: ['radio', 'journalist', 'previous-coverage'],
    lastInteraction: '2023-11-15',
    createdAt: '2023-05-08'
  },
  {
    id: 'c10',
    name: 'James Park',
    organization: 'Annex Community Association',
    type: 'partner',
    email: 'jpark@annexcommunity.ca',
    phone: '416-555-0110',
    address: '125 Brunswick Ave, Toronto',
    notes: 'Community organizer. Helps coordinate neighbourhood outreach.',
    tags: ['community', 'volunteer', 'local-leader'],
    lastInteraction: '2024-01-22',
    createdAt: '2023-01-14'
  }
]

export const contactTypeLabels: Record<ContactType, string> = {
  business: 'Business',
  politician: 'Politician',
  media: 'Media',
  partner: 'Partner Org',
  donor: 'Donor'
}

export const contactTypeColors: Record<ContactType, string> = {
  business: 'bg-blue-100 text-blue-700',
  politician: 'bg-purple-100 text-purple-700',
  media: 'bg-orange-100 text-orange-700',
  partner: 'bg-ct-teal bg-opacity-20 text-ct-teal',
  donor: 'bg-ct-gold bg-opacity-20 text-ct-clay'
}
