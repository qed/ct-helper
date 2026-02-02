import { useState, useMemo } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Plus, Users } from 'lucide-react'
import { useAppContext } from '../App'
import { contacts, ContactType, contactTypeLabels } from '../data/contacts'
import PageContainer from '../components/layout/PageContainer'
import SearchBar from '../components/crm/SearchBar'
import ContactCard from '../components/crm/ContactCard'
import Button from '../components/ui/Button'

export default function CRM() {
  const { isLoggedIn } = useAppContext()
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState<ContactType | 'all'>('all')

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />
  }

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

  const typeFilters: { value: ContactType | 'all'; label: string }[] = [
    { value: 'all', label: 'All' },
    ...Object.entries(contactTypeLabels).map(([value, label]) => ({
      value: value as ContactType,
      label
    }))
  ]

  return (
    <div className="bg-white/95 min-h-screen">
    <PageContainer>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-ct-navy">CRM</h1>
          <p className="text-gray-600">Manage contacts and relationships</p>
        </div>
        <div className="flex gap-3">
          <Link to="/crm/follow-ups">
            <Button variant="outline">
              Follow-ups
            </Button>
          </Link>
          <Button variant="primary">
            <Plus className="w-4 h-4 mr-2" />
            Add Contact
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search by name, organization, or tag..."
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {typeFilters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setTypeFilter(filter.value)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors min-h-[44px] ${
                  typeFilter === filter.value
                    ? 'bg-ct-navy text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
        <Users className="w-4 h-4" />
        <span>{filteredContacts.length} contacts</span>
      </div>

      {filteredContacts.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredContacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl">
          <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No contacts found matching your criteria.</p>
        </div>
      )}
    </PageContainer>
    </div>
  )
}
