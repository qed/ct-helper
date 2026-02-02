import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Users, ChevronDown, ChevronUp, Send, CheckCircle, User } from 'lucide-react'
import { campaigns } from '../data/campaigns'
import { Recipient } from '../data/recipients'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { Textarea } from '../components/ui/Textarea'
import { Input } from '../components/ui/Input'
import Modal from '../components/ui/Modal'
import { useAppContext } from '../App'
import { cn } from '../lib/utils'

export default function CampaignDetail() {
  const { id } = useParams()
  const campaign = campaigns.find(c => c.id === id)
  const { userInfo, setUserInfo } = useAppContext()

  const [step, setStep] = useState<'select' | 'compose' | 'review' | 'success'>('select')
  const [selectedRecipient, setSelectedRecipient] = useState<Recipient | null>(null)
  const [letterText, setLetterText] = useState('')
  const [userName, setUserName] = useState(userInfo.name)
  const [userEmail, setUserEmail] = useState(userInfo.email)
  const [expandedIssue, setExpandedIssue] = useState(false)
  const [expandedKeyPoints, setExpandedKeyPoints] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  if (!campaign) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4 bg-background">
        <h1 className="font-serif text-2xl font-bold text-primary">Campaign not found</h1>
        <Link to="/campaigns">
          <Button>Return to Campaigns</Button>
        </Link>
      </div>
    )
  }

  const handleSelectRecipient = (recipient: Recipient) => {
    setSelectedRecipient(recipient)
    const personalizedLetter = campaign.templateLetter
      .replace('[RECIPIENT]', recipient.name)
      .replace('[YOUR NAME]', userName || '[Your Name]')
    setLetterText(personalizedLetter)
    setStep('compose')
  }

  const handlePreview = () => {
    if (!userName.trim() || !userEmail.trim() || !userEmail.includes('@')) return
    setUserInfo({ name: userName, email: userEmail })
    const finalLetter = letterText.replace('[Your Name]', userName || '[Your Name]')
    setLetterText(finalLetter)
    setShowPreview(true)
  }

  const handleSend = () => {
    setIsSending(true)
    setTimeout(() => {
      setIsSending(false)
      setShowPreview(false)
      setStep('success')
    }, 1500)
  }

  const handleStartOver = () => {
    setStep('select')
    setSelectedRecipient(null)
    setLetterText('')
  }

  const isFormValid = userName.trim() && userEmail.trim() && userEmail.includes('@')

  // Success view
  if (step === 'success') {
    return (
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="container mx-auto max-w-3xl">
          <Card className="text-center py-16 border-t-4 border-t-green-600">
            <CardContent>
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-6">
                <CheckCircle size={40} />
              </div>
              <h2 className="font-serif text-3xl font-bold text-primary mb-4">
                Letter Sent!
              </h2>
              <p className="text-lg text-text-secondary max-w-md mx-auto mb-4">
                Your letter to <strong>{selectedRecipient?.name}</strong> has been sent. Your voice makes a difference!
              </p>
              <div className="bg-background rounded-lg p-4 mb-8 max-w-md mx-auto">
                <p className="text-sm text-text-secondary">
                  <strong>Note:</strong> This is a demo. In the full version, your letter would be delivered via email or the official correspondence system.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/campaigns">
                  <Button variant="outline">More Campaigns</Button>
                </Link>
                <Link to="/">
                  <Button>Back to Home</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <Link
          to="/campaigns"
          className="inline-flex items-center text-text-secondary hover:text-primary mb-6 text-sm font-medium"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Campaigns
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Campaign Header */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="secondary" className="capitalize">
                  {campaign.level}
                </Badge>
                <Badge variant="success" className="capitalize">
                  {campaign.status}
                </Badge>
              </div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-4">
                {campaign.title}
              </h1>
              <p className="text-lg text-text-primary leading-relaxed">
                {campaign.description}
              </p>
            </div>

            {/* Progress Indicator */}
            <div className="bg-white rounded-lg border border-gray-200 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={cn(
                  'flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold',
                  step === 'select' ? 'bg-primary text-white' : 'bg-green-100 text-green-700'
                )}>
                  1
                </span>
                <span className="text-sm font-medium text-text-secondary">Select Recipient</span>
              </div>
              <div className="h-px w-8 bg-gray-300" />
              <div className="flex items-center gap-2">
                <span className={cn(
                  'flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold',
                  step === 'compose' ? 'bg-primary text-white' : step === 'select' ? 'bg-gray-200 text-gray-500' : 'bg-green-100 text-green-700'
                )}>
                  2
                </span>
                <span className="text-sm font-medium text-text-secondary">Write Letter</span>
              </div>
              <div className="h-px w-8 bg-gray-300" />
              <div className="flex items-center gap-2">
                <span className={cn(
                  'flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold',
                  step === 'review' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
                )}>
                  3
                </span>
                <span className="text-sm font-medium text-text-secondary">Review & Send</span>
              </div>
            </div>

            {/* Letter Composer - shows when recipient is selected */}
            {step === 'compose' && selectedRecipient && (
              <Card className="border-t-4 border-t-accent">
                <CardHeader>
                  <CardTitle className="text-xl">Write Your Letter</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-background rounded-lg p-4">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0">
                        <User size={20} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-text-primary">Sending to:</h4>
                        <p className="font-medium">{selectedRecipient.name}</p>
                        <p className="text-sm text-text-secondary">{selectedRecipient.title}</p>
                        <p className="text-sm text-text-secondary">{selectedRecipient.organization}</p>
                      </div>
                    </div>
                  </div>

                  <Textarea
                    label="Your Letter"
                    value={letterText}
                    onChange={(e) => setLetterText(e.target.value)}
                    className="min-h-[300px] font-serif text-base leading-relaxed"
                  />

                  <p className="text-sm text-text-light">
                    Feel free to personalize this letter. Your unique voice makes a difference!
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Your Name"
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="Enter your name"
                    />
                    <Input
                      label="Your Email"
                      type="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Button
                      onClick={handlePreview}
                      disabled={!isFormValid}
                      fullWidth
                      size="lg"
                      className="group"
                    >
                      <Send className="mr-2 h-5 w-5" />
                      Preview & Send
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={handleStartOver}
                    >
                      Change Recipient
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Issue Summary - Collapsible */}
            <Card>
              <button
                onClick={() => setExpandedIssue(!expandedIssue)}
                className="w-full px-6 py-4 flex items-center justify-between text-left min-h-[44px]"
              >
                <h3 className="font-serif text-xl font-semibold text-primary">The Issue</h3>
                {expandedIssue ? (
                  <ChevronUp className="w-5 h-5 text-text-secondary" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-text-secondary" />
                )}
              </button>
              {expandedIssue && (
                <CardContent>
                  <div className="text-text-secondary">
                    {campaign.issueSummary.split('\n\n').map((para, i) => (
                      <p key={i} className="mb-3 last:mb-0">{para}</p>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Key Points - Collapsible */}
            <Card>
              <button
                onClick={() => setExpandedKeyPoints(!expandedKeyPoints)}
                className="w-full px-6 py-4 flex items-center justify-between text-left min-h-[44px]"
              >
                <h3 className="font-serif text-xl font-semibold text-primary">Key Points</h3>
                {expandedKeyPoints ? (
                  <ChevronUp className="w-5 h-5 text-text-secondary" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-text-secondary" />
                )}
              </button>
              {expandedKeyPoints && (
                <CardContent>
                  <ul className="space-y-3">
                    {campaign.talkingPoints.map((point, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold text-accent-hover">
                          {i + 1}
                        </span>
                        <span className="text-text-secondary">{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              )}
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <Card className="bg-primary text-white border-none">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="w-5 h-5 text-accent" />
                  <span className="text-white/80">Letters Sent</span>
                </div>
                <div className="text-4xl font-bold text-accent">
                  {campaign.lettersSent}
                </div>
              </CardContent>
            </Card>

            {/* Recipients */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Write To</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {campaign.recipients.map((recipient) => (
                    <button
                      key={recipient.id}
                      onClick={() => handleSelectRecipient(recipient)}
                      className={cn(
                        'w-full text-left p-4 rounded-lg border-2 transition-colors min-h-[44px]',
                        selectedRecipient?.id === recipient.id
                          ? 'border-primary bg-primary/5'
                          : 'border-gray-200 hover:border-primary'
                      )}
                    >
                      <p className="font-medium text-text-primary">{recipient.name}</p>
                      <p className="text-sm text-text-secondary">{recipient.title}</p>
                      <p className="text-sm text-text-light">{recipient.organization}</p>
                    </button>
                  ))}
                </div>
                {step === 'select' && (
                  <p className="text-center text-sm text-text-light mt-4">
                    Select a recipient above to start writing your letter
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      <Modal isOpen={showPreview} onClose={() => setShowPreview(false)} title="Preview Your Letter" size="lg">
        <div className="space-y-4">
          <div className="bg-background rounded-lg p-4 text-sm">
            <p><strong>To:</strong> {selectedRecipient?.name} ({selectedRecipient?.email})</p>
            <p><strong>From:</strong> {userName} ({userEmail})</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 max-h-[400px] overflow-y-auto">
            <pre className="whitespace-pre-wrap font-serif text-sm leading-relaxed">
              {letterText}
            </pre>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" onClick={() => setShowPreview(false)} className="flex-1">
              Edit Letter
            </Button>
            <Button onClick={handleSend} isLoading={isSending} className="flex-1">
              <Send className="mr-2 h-4 w-4" />
              Send Letter
            </Button>
          </div>

          <p className="text-xs text-text-light text-center">
            By clicking "Send Letter", you agree to have your name and message sent to the recipient.
          </p>
        </div>
      </Modal>
    </div>
  )
}
