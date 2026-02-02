import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Search, Plus, Users, Mail, Phone, Calendar, ArrowRight } from 'lucide-react'
import { contacts, ContactType, contactTypeLabels } from '../data/contacts'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Card, CardContent } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'

export default function CRM() {
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState<ContactType | 'all'>('all')

  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) => {
      const matchesSearch =
        contact.name.toLowerCase().includes(search.toLowerCase()) ||
        contact.organization.toLowerCase().includes(search.toLowerCase()) ||
        contact.email.toLowerCase().includes(search.toLowerCase()) ||
        contact.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))

      const matchesType = typeFilter === 'all' || contact.type === typeFilter

      return matchesSearch && matchesType
    })
  }, [search, typeFilter])

  const tabs: { id: ContactType | 'all'; label: string }[] = [
    { id: 'all', label: 'All Contacts' },
    { id: 'business', label: 'Businesses' },
    { id: 'politician', label: 'Politicians' },
    { id: 'media', label: 'Media' },
    { id: 'partner', label: 'Partners' },
    { id: 'donor', label: 'Donors' }
  ]

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
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-text-primary">
            Neighbourhood CRM
          </h1>
          <p className="text-text-secondary">
            Manage relationships with local partners and officials.
          </p>
        </div>
        <div className="flex gap-3">
          <Link to="/crm/follow-ups">
            <Button variant="outline">Follow-ups</Button>
          </Link>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Contact
          </Button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <div className="relative w-full md:w-96">
          <Input
            placeholder="Search by name, organization, or tag..."
            icon={<Search className="h-4 w-4" />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto w-full pb-2 md:pb-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setTypeFilter(tab.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors min-h-[40px] ${
                typeFilter === tab.id
                  ? 'bg-secondary text-white'
                  : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center gap-2 text-sm text-text-secondary">
        <Users className="w-4 h-4" />
        <span>{filteredContacts.length} contacts</span>
      </div>

      {/* Contact Grid */}
      {filteredContacts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContacts.map((contact) => (
            <Link key={contact.id} to={`/crm/contacts/${contact.id}`}>
              <Card className="h-full hover:shadow-md transition-shadow cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center text-xl font-serif font-bold text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      {contact.name.charAt(0)}
                    </div>
                    <Badge variant={getBadgeVariant(contact.type)} className="capitalize">
                      {contactTypeLabels[contact.type]}
                    </Badge>
                  </div>

                  <h3 className="font-bold text-lg text-text-primary mb-1">
                    {contact.name}
                  </h3>
                  <p className="text-sm text-text-secondary mb-4">
                    {contact.organization}
                  </p>

                  <div className="space-y-2 text-sm text-text-secondary mb-4">
                    <p className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-text-light" />
                      <span className="truncate">{contact.email}</span>
                    </p>
                    {contact.phone && (
                      <p className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-text-light" />
                        {contact.phone}
                      </p>
                    )}
                    {contact.lastInteraction && (
                      <p className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-text-light" />
                        Last: {new Date(contact.lastInteraction).toLocaleDateString()}
                      </p>
                    )}
                  </div>

                  {contact.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {contact.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-gray-100 text-text-secondary rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                      {contact.tags.length > 3 && (
                        <span className="px-2 py-0.5 text-text-light text-xs">
                          +{contact.tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex items-center gap-1 text-primary font-medium text-sm group-hover:underline">
                    View Details
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-text-secondary">No contacts found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}
