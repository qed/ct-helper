import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Mail, Phone, MapPin, Calendar, Plus, Tag } from 'lucide-react'
import { useAppContext } from '../App'
import { contacts, contactTypeLabels, ContactType } from '../data/contacts'
import { interactions as mockInteractions, Interaction } from '../data/interactions'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import InteractionTimeline from '../components/crm/InteractionTimeline'
import LogInteractionModal from '../components/crm/LogInteractionModal'

export default function ContactDetailPage() {
  const { id } = useParams()
  const { interactions: localInteractions, addInteraction } = useAppContext()
  const [showLogModal, setShowLogModal] = useState(false)

  const contact = contacts.find(c => c.id === id)

  if (!contact) {
    return (
      <div className="flex items-center justify-center flex-col gap-4 py-12">
        <h1 className="font-serif text-2xl font-bold text-primary">Contact Not Found</h1>
        <Link to="/crm">
          <Button>Back to CRM</Button>
        </Link>
      </div>
    )
  }

  // Combine mock interactions with locally stored ones
  const contactMockInteractions = mockInteractions.filter(i => i.contactId === contact.id)
  const contactLocalInteractions = localInteractions.filter(i => i.contactId === contact.id)
  const allInteractions: Interaction[] = [
    ...contactLocalInteractions,
    ...contactMockInteractions
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const handleLogInteraction = (data: {
    type: Interaction['type']
    date: string
    notes: string
    staffName: string
  }) => {
    const newInteraction: Interaction = {
      id: `local-${Date.now()}`,
      contactId: contact.id,
      ...data
    }
    addInteraction(newInteraction)
  }

  const getBadgeVariant = (type: ContactType) => {
    const variants: Record<ContactType, 'business' | 'politician' | 'media' | 'partner' | 'donor'> = {
      business: 'business',
      politician: 'politician',
      media: 'media',
      partner: 'partner',
      donor: 'donor'
    }
    return variants[type]
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

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Contact Info */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-serif font-bold text-xl">
                  {contact.name.split(' ').map(n => n[0]).join('')}
                </div>
                <Badge variant={getBadgeVariant(contact.type)} className="capitalize">
                  {contactTypeLabels[contact.type]}
                </Badge>
              </div>

              <h1 className="font-serif text-2xl font-bold text-primary mb-1">{contact.name}</h1>
              <p className="text-text-secondary mb-4">{contact.organization}</p>

              <div className="space-y-3">
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-3 text-text-secondary hover:text-primary transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span className="break-all">{contact.email}</span>
                </a>

                {contact.phone && (
                  <a
                    href={`tel:${contact.phone}`}
                    className="flex items-center gap-3 text-text-secondary hover:text-primary transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    <span>{contact.phone}</span>
                  </a>
                )}

                {contact.address && (
                  <div className="flex items-center gap-3 text-text-secondary">
                    <MapPin className="w-5 h-5 flex-shrink-0" />
                    <span>{contact.address}</span>
                  </div>
                )}

                {contact.lastInteraction && (
                  <div className="flex items-center gap-3 text-text-secondary">
                    <Calendar className="w-5 h-5" />
                    <span>Last contact: {new Date(contact.lastInteraction).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          {contact.tags.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Tags
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {contact.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-text-secondary rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Notes */}
          {contact.notes && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-text-secondary">{contact.notes}</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Interaction History */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Interaction History</CardTitle>
                <Button onClick={() => setShowLogModal(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Log Interaction
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <InteractionTimeline interactions={allInteractions} />
            </CardContent>
          </Card>
        </div>
      </div>

      <LogInteractionModal
        isOpen={showLogModal}
        onClose={() => setShowLogModal(false)}
        contactName={contact.name}
        onSave={handleLogInteraction}
      />
    </div>
  )
}
