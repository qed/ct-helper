import { Recipient } from '../../data/recipients'
import Button from '../ui/Button'
import Modal from '../ui/Modal'

interface LetterPreviewProps {
  isOpen: boolean
  onClose: () => void
  letter: string
  recipient: Recipient
  userName: string
  userEmail: string
  onSend: () => void
}

export default function LetterPreview({
  isOpen,
  onClose,
  letter,
  recipient,
  userName,
  userEmail,
  onSend
}: LetterPreviewProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Preview Your Letter" size="lg">
      <div className="space-y-4">
        <div className="bg-gray-50 rounded-lg p-4 text-sm">
          <p><strong>To:</strong> {recipient.name} ({recipient.email})</p>
          <p><strong>From:</strong> {userName} ({userEmail})</p>
        </div>

        <div className="bg-white border rounded-lg p-6 max-h-[400px] overflow-y-auto">
          <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
            {letter}
          </pre>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Edit Letter
          </Button>
          <Button variant="accent" onClick={onSend} className="flex-1">
            Send Letter
          </Button>
        </div>

        <p className="text-xs text-gray-500 text-center">
          By clicking "Send Letter", you agree to have your name and message sent to the recipient.
        </p>
      </div>
    </Modal>
  )
}
