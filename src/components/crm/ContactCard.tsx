import { Link } from 'react-router-dom'
import { Mail, Phone, Calendar, ArrowRight } from 'lucide-react'
import { Contact, contactTypeLabels, contactTypeColors } from '../../data/contacts'
import Card from '../ui/Card'

interface ContactCardProps {
  contact: Contact
}

export default function ContactCard({ contact }: ContactCardProps) {
  return (
    <Card hover className="h-full">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-bold text-ct-navy">{contact.name}</h3>
          <p className="text-sm text-gray-600">{contact.organization}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${contactTypeColors[contact.type]}`}>
          {contactTypeLabels[contact.type]}
        </span>
      </div>

      <div className="space-y-2 text-sm text-gray-600 mb-4">
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4" />
          <span className="truncate">{contact.email}</span>
        </div>
        {contact.phone && (
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <span>{contact.phone}</span>
          </div>
        )}
        {contact.lastInteraction && (
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>Last: {new Date(contact.lastInteraction).toLocaleDateString()}</span>
          </div>
        )}
      </div>

      {contact.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {contact.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs"
            >
              {tag}
            </span>
          ))}
          {contact.tags.length > 3 && (
            <span className="px-2 py-0.5 text-gray-500 text-xs">
              +{contact.tags.length - 3}
            </span>
          )}
        </div>
      )}

      <Link
        to={`/crm/contacts/${contact.id}`}
        className="inline-flex items-center gap-1 text-ct-teal font-medium text-sm hover:underline"
      >
        View Details
        <ArrowRight className="w-4 h-4" />
      </Link>
    </Card>
  )
}
