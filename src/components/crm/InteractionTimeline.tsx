import { Mail, Phone, Users, Calendar, Gift, FileText, MoreHorizontal } from 'lucide-react'
import { Interaction, InteractionType, interactionTypeLabels } from '../../data/interactions'

interface InteractionTimelineProps {
  interactions: Interaction[]
}

const iconMap: Record<InteractionType, typeof Mail> = {
  email: Mail,
  phone: Phone,
  meeting: Users,
  event: Calendar,
  donation: Gift,
  letter: FileText,
  other: MoreHorizontal
}

const colorMap: Record<InteractionType, string> = {
  email: 'bg-blue-100 text-blue-600',
  phone: 'bg-green-100 text-green-600',
  meeting: 'bg-purple-100 text-purple-600',
  event: 'bg-accent/30 text-accent-hover',
  donation: 'bg-secondary/20 text-secondary',
  letter: 'bg-primary/20 text-primary',
  other: 'bg-gray-100 text-gray-600'
}

export default function InteractionTimeline({ interactions }: InteractionTimelineProps) {
  if (interactions.length === 0) {
    return (
      <div className="text-center py-8 text-text-secondary">
        No interactions recorded yet.
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {interactions.map((interaction, index) => {
        const Icon = iconMap[interaction.type]
        return (
          <div key={interaction.id} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colorMap[interaction.type]}`}>
                <Icon className="w-5 h-5" />
              </div>
              {index < interactions.length - 1 && (
                <div className="w-0.5 bg-gray-200 flex-1 mt-2" />
              )}
            </div>
            <div className="flex-1 pb-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="font-medium text-text-primary">
                    {interactionTypeLabels[interaction.type]}
                  </span>
                  <span className="text-text-light mx-2">·</span>
                  <span className="text-sm text-text-secondary">
                    {new Date(interaction.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              </div>
              <p className="text-text-secondary mt-1">{interaction.notes}</p>
              <p className="text-sm text-text-light mt-1">by {interaction.staffName}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
