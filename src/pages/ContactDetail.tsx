import { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft, Mail, Phone, MapPin, Calendar, Plus, Tag } from 'lucide-react'
import { useAppContext } from '../App'
import { contacts, contactTypeLabels, contactTypeColors } from '../data/contacts'
import { interactions as mockInteractions, Interaction } from '../data/interactions'
import PageContainer from '../components/layout/PageContainer'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import InteractionTimeline from '../components/crm/InteractionTimeline'
import LogInteractionModal from '../components/crm/LogInteractionModal'

export default function ContactDetailPage() {
  const { id } = useParams()
  const { isLoggedIn, interactions: localInteractions, addInteraction } = useAppContext()
  const [showLogModal, setShowLogModal] = useState(false)

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />
  }

  const contact = contacts.find(c => c.id === id)

  if (!contact) {
    return (
      <PageContainer>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-ct-navy mb-4">Contact Not Found</h1>
          <Link to="/crm">
            <Button variant="primary">Back to CRM</Button>
          </Link>
        </div>
      </PageContainer>
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

  return (
    <div className="bg-white/95 min-h-screen">
    <PageContainer>
      <Link
        to="/crm"
        className="inline-flex items-center gap-2 text-ct-teal hover:underline mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to CRM
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Contact Info */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <div className="flex items-start justify-between mb-4">
              <div className="w-16 h-16 bg-ct-navy rounded-full flex items-center justify-center text-white font-bold text-xl">
                {contact.name.split(' ').map(n => n[0]).join('')}
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${contactTypeColors[contact.type]}`}>
                {contactTypeLabels[contact.type]}
              </span>
            </div>

            <h1 className="text-2xl font-bold text-ct-navy mb-1">{contact.name}</h1>
            <p className="text-gray-600 mb-4">{contact.organization}</p>

            <div className="space-y-3">
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-3 text-gray-600 hover:text-ct-teal transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span className="break-all">{contact.email}</span>
              </a>

              {contact.phone && (
                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-center gap-3 text-gray-600 hover:text-ct-teal transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  <span>{contact.phone}</span>
                </a>
              )}

              {contact.address && (
                <div className="flex items-center gap-3 text-gray-600">
                  <MapPin className="w-5 h-5 flex-shrink-0" />
                  <span>{contact.address}</span>
                </div>
              )}

              {contact.lastInteraction && (
                <div className="flex items-center gap-3 text-gray-600">
                  <Calendar className="w-5 h-5" />
                  <span>Last contact: {new Date(contact.lastInteraction).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </Card>

          {/* Tags */}
          {contact.tags.length > 0 && (
            <Card>
              <h2 className="font-bold text-ct-navy mb-3 flex items-center gap-2">
                <Tag className="w-4 h-4" />
                Tags
              </h2>
              <div className="flex flex-wrap gap-2">
                {contact.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Card>
          )}

          {/* Notes */}
          {contact.notes && (
            <Card>
              <h2 className="font-bold text-ct-navy mb-3">Notes</h2>
              <p className="text-gray-600">{contact.notes}</p>
            </Card>
          )}
        </div>

        {/* Interaction History */}
        <div className="lg:col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-ct-navy">Interaction History</h2>
              <Button onClick={() => setShowLogModal(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Log Interaction
              </Button>
            </div>

            <InteractionTimeline interactions={allInteractions} />
          </Card>
        </div>
      </div>

      <LogInteractionModal
        isOpen={showLogModal}
        onClose={() => setShowLogModal(false)}
        contactName={contact.name}
        onSave={handleLogInteraction}
      />
    </PageContainer>
    </div>
  )
}
