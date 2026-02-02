import { CheckCircle, Share2, Twitter, Facebook, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../ui/Button'
import Modal from '../ui/Modal'
import { Campaign } from '../../data/campaigns'

interface SendConfirmationProps {
  isOpen: boolean
  onClose: () => void
  campaign: Campaign
  recipientName: string
}

export default function SendConfirmation({
  isOpen,
  onClose,
  campaign,
  recipientName
}: SendConfirmationProps) {
  const shareText = `I just took action on ${campaign.title} with Common Table! Join me in making a difference.`
  const shareUrl = window.location.origin + window.location.pathname

  const handleShare = (platform: string) => {
    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`,
      email: `mailto:?subject=${encodeURIComponent(`Take Action: ${campaign.title}`)}&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`
    }

    window.open(urls[platform], '_blank')
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <div className="text-center py-4">
        <div className="w-16 h-16 bg-ct-moss bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-ct-moss" />
        </div>

        <h2 className="text-2xl font-bold text-ct-navy mb-2">Thank You!</h2>
        <p className="text-gray-600 mb-6">
          Your letter to <strong>{recipientName}</strong> has been sent. Your voice matters in creating change!
        </p>

        <div className="bg-ct-sand rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-600">
            <strong>Note:</strong> This is a demo. In the full version, your letter would be delivered via email or the official correspondence system.
          </p>
        </div>

        <div className="mb-6">
          <p className="text-sm font-medium text-ct-navy mb-3 flex items-center justify-center gap-2">
            <Share2 className="w-4 h-4" />
            Spread the word
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => handleShare('twitter')}
              className="p-3 rounded-full bg-[#1DA1F2] text-white hover:bg-opacity-90 transition-colors min-h-[44px] min-w-[44px]"
            >
              <Twitter className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleShare('facebook')}
              className="p-3 rounded-full bg-[#4267B2] text-white hover:bg-opacity-90 transition-colors min-h-[44px] min-w-[44px]"
            >
              <Facebook className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleShare('email')}
              className="p-3 rounded-full bg-gray-600 text-white hover:bg-opacity-90 transition-colors min-h-[44px] min-w-[44px]"
            >
              <Mail className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link to="/campaigns" className="flex-1">
            <Button variant="outline" className="w-full">
              More Campaigns
            </Button>
          </Link>
          <Button variant="primary" onClick={onClose} className="flex-1">
            Done
          </Button>
        </div>
      </div>
    </Modal>
  )
}
