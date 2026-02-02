import { useState } from 'react'
import { InteractionType, interactionTypeLabels } from '../../data/interactions'
import Modal from '../ui/Modal'
import { Input, Textarea } from '../ui/Input'
import Button from '../ui/Button'

interface LogInteractionModalProps {
  isOpen: boolean
  onClose: () => void
  contactName: string
  onSave: (data: {
    type: InteractionType
    date: string
    notes: string
    staffName: string
  }) => void
}

export default function LogInteractionModal({
  isOpen,
  onClose,
  contactName,
  onSave
}: LogInteractionModalProps) {
  const [type, setType] = useState<InteractionType>('meeting')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [notes, setNotes] = useState('')
  const [staffName, setStaffName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (notes.trim() && staffName.trim()) {
      onSave({ type, date, notes, staffName })
      setNotes('')
      onClose()
    }
  }

  const interactionTypes = Object.entries(interactionTypeLabels) as [InteractionType, string][]

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Log Interaction" size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <p className="text-sm text-gray-600">
          Recording interaction with <strong>{contactName}</strong>
        </p>

        <div>
          <label className="block text-sm font-medium text-ct-navy mb-1">
            Interaction Type
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as InteractionType)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-ct-teal focus:ring-2 focus:ring-ct-teal focus:ring-opacity-20 outline-none transition-all min-h-[44px]"
          >
            {interactionTypes.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <Input
          label="Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <Textarea
          label="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Describe the interaction..."
          className="min-h-[120px]"
        />

        <Input
          label="Your Name"
          type="text"
          value={staffName}
          onChange={(e) => setStaffName(e.target.value)}
          placeholder="Enter your name"
        />

        <div className="flex gap-3 pt-2">
          <Button type="button" variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="flex-1"
            disabled={!notes.trim() || !staffName.trim()}
          >
            Save Interaction
          </Button>
        </div>
      </form>
    </Modal>
  )
}
