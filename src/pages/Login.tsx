import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Lock, AlertCircle } from 'lucide-react'
import { useAppContext } from '../App'
import PageContainer from '../components/layout/PageContainer'
import { Input } from '../components/ui/Input'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { setIsLoggedIn } = useAppContext()
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email.includes('@')) {
      setError('Please enter a valid email address')
      return
    }

    // Mock login - accepts any email
    setIsLoggedIn(true)
    navigate('/dashboard')
  }

  return (
    <div className="bg-white/95 min-h-screen">
    <PageContainer narrow className="min-h-[60vh] flex items-center justify-center">
      <Card className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-ct-navy rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-ct-gold" />
          </div>
          <h1 className="text-2xl font-bold text-ct-navy">Staff Login</h1>
          <p className="text-gray-600 mt-2">Access the CRM and Dashboard</p>
        </div>

        <div className="bg-ct-sand rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-600">
            <strong>Demo Mode:</strong> Enter any email address to log in.
            This is a prototype without real authentication.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-[38px] w-5 h-5 text-gray-400" />
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="pl-10"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-[38px] w-5 h-5 text-gray-400" />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter any password"
              className="pl-10"
            />
          </div>

          <Button type="submit" className="w-full" variant="primary">
            Log In
          </Button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Not a staff member?{' '}
          <a href="#" className="text-ct-teal hover:underline">
            Learn about volunteering
          </a>
        </p>
      </Card>
    </PageContainer>
    </div>
  )
}
