import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, User, LogOut } from 'lucide-react'
import { useAppContext } from '../../App'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isLoggedIn, setIsLoggedIn } = useAppContext()
  const location = useLocation()

  const publicLinks = [
    { to: '/', label: 'Home' },
    { to: '/campaigns', label: 'Take Action' },
  ]

  const staffLinks = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/crm', label: 'CRM' },
    { to: '/crm/follow-ups', label: 'Follow-ups' },
  ]

  const isActive = (path: string) => location.pathname === path

  const handleLogout = () => {
    setIsLoggedIn(false)
    setIsMenuOpen(false)
  }

  return (
    <header className="bg-ct-navy/95 backdrop-blur-sm text-white sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-ct-gold rounded-lg flex items-center justify-center">
              <span className="font-bold text-ct-navy text-sm">CT</span>
            </div>
            <span className="font-bold text-lg hidden sm:block">CT Helper</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {publicLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`py-2 transition-colors ${
                  isActive(link.to)
                    ? 'text-ct-gold'
                    : 'text-white hover:text-ct-gold'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {isLoggedIn && (
              <>
                <div className="w-px h-6 bg-white bg-opacity-30" />
                {staffLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`py-2 transition-colors ${
                      isActive(link.to)
                        ? 'text-ct-gold'
                        : 'text-white hover:text-ct-gold'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </>
            )}

            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 px-4 py-2 bg-ct-gold text-ct-navy rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
              >
                <User className="w-4 h-4" />
                <span>Staff Login</span>
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-white border-opacity-20">
            {publicLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className={`block py-3 px-2 rounded-lg transition-colors ${
                  isActive(link.to)
                    ? 'bg-ct-gold text-ct-navy'
                    : 'hover:bg-white hover:bg-opacity-10'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {isLoggedIn && (
              <>
                <div className="my-2 border-t border-white border-opacity-20" />
                <p className="px-2 py-1 text-sm text-white text-opacity-60">Staff</p>
                {staffLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block py-3 px-2 rounded-lg transition-colors ${
                      isActive(link.to)
                        ? 'bg-ct-gold text-ct-navy'
                        : 'hover:bg-white hover:bg-opacity-10'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </>
            )}

            <div className="my-2 border-t border-white border-opacity-20" />
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 py-3 px-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 py-3 px-2 rounded-lg bg-ct-gold text-ct-navy font-semibold"
              >
                <User className="w-4 h-4" />
                <span>Staff Login</span>
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  )
}
