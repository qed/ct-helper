import { useState, useEffect } from 'react'
import { Campaign } from '../../data/campaigns'
import { Recipient } from '../../data/recipients'
import { Input } from '../ui/Input'
import { Textarea } from '../ui/Textarea'
import Button from '../ui/Button'
import { useAppContext } from '../../App'

interface LetterComposerProps {
  campaign: Campaign
  selectedRecipient: Recipient
  onPreview: (letter: string, userName: string, userEmail: string) => void
}

export default function LetterComposer({
  campaign,
  selectedRecipient,
  onPreview
}: LetterComposerProps) {
  const { userInfo, setUserInfo } = useAppContext()
  const [letterText, setLetterText] = useState('')
  const [userName, setUserName] = useState(userInfo.name)
  const [userEmail, setUserEmail] = useState(userInfo.email)

  useEffect(() => {
    const personalizedLetter = campaign.templateLetter
      .replace('[RECIPIENT]', selectedRecipient.name)
      .replace('[YOUR NAME]', userName || '[Your Name]')

    setLetterText(personalizedLetter)
  }, [campaign.templateLetter, selectedRecipient, userName])

  const handlePreview = () => {
    setUserInfo({ name: userName, email: userEmail })
    const finalLetter = letterText.replace('[Your Name]', userName || '[Your Name]')
    onPreview(finalLetter, userName, userEmail)
  }

  const isValid = userName.trim() && userEmail.trim() && userEmail.includes('@')

  return (
    <div className="space-y-6">
      <div className="bg-ct-sand rounded-lg p-4">
        <h4 className="font-semibold text-ct-navy mb-2">Sending to:</h4>
        <p className="font-medium">{selectedRecipient.name}</p>
        <p className="text-sm text-gray-600">{selectedRecipient.title}</p>
        <p className="text-sm text-gray-600">{selectedRecipient.organization}</p>
      </div>

      <Textarea
        label="Your Letter"
        value={letterText}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setLetterText(e.target.value)}
        className="min-h-[300px] font-mono text-sm"
      />

      <p className="text-sm text-gray-500">
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

      <Button
        onClick={handlePreview}
        disabled={!isValid}
        className="w-full"
        variant="accent"
      >
        Preview Letter
      </Button>
    </div>
  )
}
