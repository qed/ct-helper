import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { User, Lock, AlertCircle, HeartHandshake } from 'lucide-react'
import { useAppContext } from '../App'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { Card, CardContent } from '../components/ui/Card'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { setIsLoggedIn } = useAppContext()
  const navigate = useNavigate()
  const location = useLocation()

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/dashboard'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email.includes('@')) {
      setError('Please enter a valid email address')
      return
    }

    setIsLoading(true)
    // Mock login delay
    setTimeout(() => {
      setIsLoggedIn(true)
      setIsLoading(false)
      navigate(from, { replace: true })
    }, 800)
  }

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
              <HeartHandshake className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-serif text-2xl font-bold text-primary">Staff Login</h1>
            <p className="text-text-secondary mt-2">Access the CRM and Dashboard</p>
          </div>

          <div className="bg-background rounded-lg p-4 mb-6 border border-gray-100">
            <p className="text-sm text-text-secondary">
              <strong className="text-primary">Demo Mode:</strong> Enter any email address to log in.
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
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              icon={<User className="w-5 h-5" />}
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter any password"
              icon={<Lock className="w-5 h-5" />}
            />

            <Button type="submit" fullWidth size="lg" isLoading={isLoading}>
              Log In
            </Button>
          </form>

          <p className="text-center text-sm text-text-secondary mt-6">
            Not a staff member?{' '}
            <a href="https://theredeemer.ca/alt/get-involved-alternative/drop-in/" target="_blank" rel="noreferrer" className="text-primary hover:underline">
              Learn about volunteering
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
