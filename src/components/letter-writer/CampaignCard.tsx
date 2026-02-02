import { Link } from 'react-router-dom'
import { ArrowRight, Users, Building2, Landmark } from 'lucide-react'
import { Campaign } from '../../data/campaigns'
import Card from '../ui/Card'
import Badge from '../ui/Badge'

interface CampaignCardProps {
  campaign: Campaign
}

export default function CampaignCard({ campaign }: CampaignCardProps) {
  const levelIcons = {
    municipal: Building2,
    provincial: Landmark,
    federal: Landmark
  }

  const levelLabels = {
    municipal: 'Municipal',
    provincial: 'Provincial',
    federal: 'Federal'
  }

  const LevelIcon = levelIcons[campaign.level]

  return (
    <Card hover className="flex flex-col h-full">
      <div className="flex items-start justify-between gap-4 mb-4">
        <Badge variant="info" size="sm">
          <LevelIcon className="w-3 h-3 mr-1" />
          {levelLabels[campaign.level]}
        </Badge>
        <Badge variant="success" size="sm">
          {campaign.status}
        </Badge>
      </div>

      <h3 className="text-xl font-bold text-ct-navy mb-2">{campaign.title}</h3>
      <p className="text-gray-600 text-sm mb-4 flex-1">{campaign.description}</p>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <Users className="w-4 h-4" />
          <span>{campaign.lettersSent} letters sent</span>
        </div>

        <Link
          to={`/campaigns/${campaign.id}`}
          className="inline-flex items-center gap-1 text-ct-teal font-medium hover:underline"
        >
          Take Action
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </Card>
  )
}
