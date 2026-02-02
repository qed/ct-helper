import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { campaigns } from '../data/campaigns'
import { Button } from '../components/ui/Button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'

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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl font-bold text-primary mb-4">
            Take Action
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Choose a campaign and make your voice heard. Every letter makes a difference.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-5 py-2.5 rounded-full font-medium transition-colors min-h-[44px] ${
                filter === f.value
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-white text-text-primary border border-gray-200 hover:border-primary hover:text-primary'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Campaign Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCampaigns.map((campaign) => (
            <Card
              key={campaign.id}
              className="flex flex-col h-full hover:shadow-lg transition-shadow border-t-4 border-t-primary"
            >
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge
                    variant={campaign.status === 'active' ? 'success' : 'secondary'}
                    className="mb-2 capitalize"
                  >
                    {campaign.status}
                  </Badge>
                  <Badge variant="outline" className="capitalize">
                    {campaign.level}
                  </Badge>
                </div>
                <CardTitle className="text-xl mb-2">{campaign.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-text-secondary line-clamp-3 mb-4">
                  {campaign.description}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-light">
                    {campaign.lettersSent} letters sent
                  </span>
                  <span className="text-text-light">
                    {campaign.recipients.length} recipient{campaign.recipients.length !== 1 ? 's' : ''}
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                <Link to={`/campaigns/${campaign.id}`} className="w-full">
                  <Button fullWidth className="group">
                    Write Letter
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredCampaigns.length === 0 && (
          <div className="text-center py-12">
            <p className="text-text-secondary text-lg">No campaigns found for this filter.</p>
          </div>
        )}
      </div>
    </div>
  )
}
