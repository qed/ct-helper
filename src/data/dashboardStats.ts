export interface DashboardStats {
  totalLettersSent: number
  uniqueSupporters: number
  activeCampaigns: number
  contactsInCRM: number
  interactionsThisMonth: number
  followUpsDue: number
}

export const dashboardStats: DashboardStats = {
  totalLettersSent: 247,
  uniqueSupporters: 89,
  activeCampaigns: 3,
  contactsInCRM: 42,
  interactionsThisMonth: 15,
  followUpsDue: 4
}

export interface CampaignBreakdown {
  id: string
  title: string
  lettersSent: number
  level: 'municipal' | 'provincial' | 'federal'
}

export const campaignBreakdown: CampaignBreakdown[] = [
  { id: '1', title: 'Fund Emergency Shelter Beds', lettersSent: 89, level: 'municipal' },
  { id: '2', title: 'Expand ODSP Benefits', lettersSent: 124, level: 'provincial' },
  { id: '3', title: 'National Housing Strategy', lettersSent: 34, level: 'federal' }
]

export interface MonthlyActivity {
  month: string
  letters: number
  interactions: number
}

export const monthlyActivity: MonthlyActivity[] = [
  { month: 'Aug', letters: 12, interactions: 8 },
  { month: 'Sep', letters: 25, interactions: 12 },
  { month: 'Oct', letters: 45, interactions: 18 },
  { month: 'Nov', letters: 38, interactions: 15 },
  { month: 'Dec', letters: 52, interactions: 22 },
  { month: 'Jan', letters: 75, interactions: 15 }
]

export interface RecentActivity {
  id: string
  type: 'letter' | 'interaction' | 'follow-up'
  description: string
  date: string
}

export const recentActivity: RecentActivity[] = [
  { id: 'a1', type: 'letter', description: 'New letter sent - Emergency Shelter Campaign', date: '2024-01-22' },
  { id: 'a2', type: 'interaction', description: 'Meeting with James Park - Annex Community', date: '2024-01-22' },
  { id: 'a3', type: 'letter', description: '3 letters sent - ODSP Campaign', date: '2024-01-21' },
  { id: 'a4', type: 'interaction', description: 'Met with Councillor Saxe', date: '2024-01-20' },
  { id: 'a5', type: 'follow-up', description: 'Follow-up completed - Media inquiry', date: '2024-01-19' },
  { id: 'a6', type: 'letter', description: '5 letters sent - Housing Strategy Campaign', date: '2024-01-18' },
  { id: 'a7', type: 'interaction', description: 'MPP Glover event attendance', date: '2024-01-18' }
]
