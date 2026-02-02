import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Users, Building2, Landmark, ChevronDown, ChevronUp } from 'lucide-react'
import { campaigns } from '../data/campaigns'
import { Recipient } from '../data/recipients'
import PageContainer from '../components/layout/PageContainer'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import Card from '../components/ui/Card'
import LetterComposer from '../components/letter-writer/LetterComposer'
import LetterPreview from '../components/letter-writer/LetterPreview'
import SendConfirmation from '../components/letter-writer/SendConfirmation'

export default function CampaignDetail() {
  const { id } = useParams()
  const campaign = campaigns.find(c => c.id === id)

  const [selectedRecipient, setSelectedRecipient] = useState<Recipient | null>(null)
  const [showComposer, setShowComposer] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [expandedIssue, setExpandedIssue] = useState(false)
  const [previewData, setPreviewData] = useState({
    letter: '',
    userName: '',
    userEmail: ''
  })

  if (!campaign) {
    return (
      <PageContainer>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-ct-navy mb-4">Campaign Not Found</h1>
          <Link to="/campaigns">
            <Button variant="primary">Back to Campaigns</Button>
          </Link>
        </div>
      </PageContainer>
    )
  }

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

  const handleSelectRecipient = (recipient: Recipient) => {
    setSelectedRecipient(recipient)
    setShowComposer(true)
  }

  const handlePreview = (letter: string, userName: string, userEmail: string) => {
    setPreviewData({ letter, userName, userEmail })
    setShowPreview(true)
  }

  const handleSend = () => {
    setShowPreview(false)
    setShowConfirmation(true)
  }

  const handleConfirmationClose = () => {
    setShowConfirmation(false)
    setShowComposer(false)
    setSelectedRecipient(null)
  }

  return (
    <div className="bg-white/95 min-h-screen">
    <PageContainer>
      <Link
        to="/campaigns"
        className="inline-flex items-center gap-2 text-ct-teal hover:underline mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Campaigns
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="info">
                <LevelIcon className="w-3 h-3 mr-1" />
                {levelLabels[campaign.level]}
              </Badge>
              <Badge variant="success">{campaign.status}</Badge>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-ct-navy mb-4">
              {campaign.title}
            </h1>

            <p className="text-lg text-gray-600">{campaign.description}</p>
          </div>

          {/* Issue Summary */}
          <Card>
            <h2 className="font-bold text-ct-navy mb-3">The Issue</h2>
            <div className={`text-gray-700 ${!expandedIssue ? 'line-clamp-4' : ''}`}>
              {campaign.issueSummary.split('\n\n').map((para, i) => (
                <p key={i} className="mb-3 last:mb-0">{para}</p>
              ))}
            </div>
            <button
              onClick={() => setExpandedIssue(!expandedIssue)}
              className="flex items-center gap-1 text-ct-teal font-medium mt-3 min-h-[44px]"
            >
              {expandedIssue ? (
                <>Show Less <ChevronUp className="w-4 h-4" /></>
              ) : (
                <>Read More <ChevronDown className="w-4 h-4" /></>
              )}
            </button>
          </Card>

          {/* Talking Points */}
          <Card>
            <h2 className="font-bold text-ct-navy mb-3">Key Points</h2>
            <ul className="space-y-3">
              {campaign.talkingPoints.map((point, i) => (
                <li key={i} className="flex gap-3">
                  <span className="w-6 h-6 bg-ct-gold bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold text-ct-clay">
                    {i + 1}
                  </span>
                  <span className="text-gray-700">{point}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Letter Composer */}
          {showComposer && selectedRecipient && (
            <Card>
              <h2 className="font-bold text-ct-navy mb-4">Write Your Letter</h2>
              <LetterComposer
                campaign={campaign}
                selectedRecipient={selectedRecipient}
                onPreview={handlePreview}
              />
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Stats */}
          <Card className="bg-ct-navy text-white">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-ct-gold" />
              <span className="text-white text-opacity-80">Letters Sent</span>
            </div>
            <div className="text-4xl font-bold text-ct-gold">
              {campaign.lettersSent}
            </div>
          </Card>

          {/* Recipients */}
          <Card>
            <h2 className="font-bold text-ct-navy mb-4">Write To</h2>
            <div className="space-y-3">
              {campaign.recipients.map((recipient) => (
                <button
                  key={recipient.id}
                  onClick={() => handleSelectRecipient(recipient)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-colors min-h-[44px] ${
                    selectedRecipient?.id === recipient.id
                      ? 'border-ct-teal bg-ct-teal bg-opacity-5'
                      : 'border-gray-200 hover:border-ct-teal'
                  }`}
                >
                  <p className="font-medium text-ct-navy">{recipient.name}</p>
                  <p className="text-sm text-gray-600">{recipient.title}</p>
                  <p className="text-sm text-gray-500">{recipient.organization}</p>
                </button>
              ))}
            </div>
          </Card>

          {!showComposer && (
            <div className="text-center text-sm text-gray-500">
              Select a recipient above to start writing your letter
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {selectedRecipient && (
        <>
          <LetterPreview
            isOpen={showPreview}
            onClose={() => setShowPreview(false)}
            letter={previewData.letter}
            recipient={selectedRecipient}
            userName={previewData.userName}
            userEmail={previewData.userEmail}
            onSend={handleSend}
          />

          <SendConfirmation
            isOpen={showConfirmation}
            onClose={handleConfirmationClose}
            campaign={campaign}
            recipientName={selectedRecipient.name}
          />
        </>
      )}
    </PageContainer>
    </div>
  )
}
