import { useState } from 'react'
import { campaigns } from '../data/campaigns'
import PageContainer from '../components/layout/PageContainer'
import CampaignCard from '../components/letter-writer/CampaignCard'

type FilterLevel = 'all' | 'municipal' | 'provincial' | 'federal'

export default function Campaigns() {
  const [filter, setFilter] = useState<FilterLevel>('all')

  const filteredCampaigns = filter === 'all'
    ? campaigns
    : campaigns.filter(c => c.level === filter)

  const filters: { value: FilterLevel; label: string }[] = [
    { value: 'all', label: 'All Campaigns' },
    { value: 'municipal', label: 'Municipal' },
    { value: 'provincial', label: 'Provincial' },
    { value: 'federal', label: 'Federal' }
  ]

  return (
    <div className="bg-white/95 min-h-screen">
    <PageContainer>
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-ct-navy mb-4">
          Take Action
        </h1>
        <p className="text-gray-600 text-lg">
          Choose a campaign and make your voice heard. Every letter makes a difference.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-4 py-2 rounded-full font-medium transition-colors min-h-[44px] ${
              filter === f.value
                ? 'bg-ct-navy text-white'
                : 'bg-white text-ct-navy hover:bg-gray-100'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Campaign Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCampaigns.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>

      {filteredCampaigns.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No campaigns found for this filter.</p>
        </div>
      )}
    </PageContainer>
    </div>
  )
}
