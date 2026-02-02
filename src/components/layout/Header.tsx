import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, User, HeartHandshake, LogOut } from 'lucide-react'
import { Button } from '../ui/Button'
import { cn } from '../../lib/utils'
import { useAppContext } from '../../App'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const { isLoggedIn, setIsLoggedIn } = useAppContext()

  const isAdminSection =
    location.pathname.startsWith('/dashboard') ||
    location.pathname.startsWith('/crm') ||
    location.pathname === '/login'

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const handleLogout = () => {
    setIsLoggedIn(false)
    setIsMenuOpen(false)
  }

  const NavLink = ({
    to,
    children,
    mobile = false
  }: {
    to: string
    children: React.ReactNode
    mobile?: boolean
  }) => {
    const isActive = location.pathname === to
    return (
      <Link
        to={to}
        className={cn(
          'font-medium transition-colors hover:text-primary',
          mobile ? 'block py-3 text-lg border-b border-gray-100' : 'text-sm',
          isActive ? 'text-primary font-bold' : 'text-text-primary'
        )}
        onClick={() => mobile && setIsMenuOpen(false)}
      >
        {children}
      </Link>
    )
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-primary text-white p-1.5 rounded-md group-hover:bg-primary-hover transition-colors">
            <HeartHandshake size={24} />
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-lg leading-none text-primary">
              CT Helper
            </span>
            <span className="text-[10px] uppercase tracking-wider text-text-secondary">
              The Common Table
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {isAdminSection && isLoggedIn ? (
            <>
              <NavLink to="/dashboard">Dashboard</NavLink>
              <NavLink to="/crm">CRM</NavLink>
              <NavLink to="/crm/follow-ups">Follow-ups</NavLink>
              <div className="h-6 w-px bg-gray-200 mx-2" />
              <Link
                to="/"
                className="text-sm text-text-secondary hover:text-primary"
              >
                Public Site
              </Link>
              <div className="flex items-center gap-2 ml-2">
                <div className="h-8 w-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                  <User size={16} />
                </div>
                <span className="text-sm font-medium">Staff</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors"
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/">Home</NavLink>
              <NavLink to="/campaigns">Take Action</NavLink>
              {isLoggedIn ? (
                <Link to="/dashboard">
                  <Button variant="outline" size="sm">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    Staff Login
                  </Button>
                </Link>
              )}
            </>
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-text-primary min-h-[44px] min-w-[44px] flex items-center justify-center"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg p-4 flex flex-col">
          {isAdminSection && isLoggedIn ? (
            <>
              <NavLink to="/dashboard" mobile>
                Dashboard
              </NavLink>
              <NavLink to="/crm" mobile>
                CRM
              </NavLink>
              <NavLink to="/crm/follow-ups" mobile>
                Follow-ups
              </NavLink>
              <NavLink to="/" mobile>
                Back to Public Site
              </NavLink>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 py-3 text-lg text-red-600 hover:text-red-700"
              >
                <LogOut size={20} />
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/" mobile>
                Home
              </NavLink>
              <NavLink to="/campaigns" mobile>
                Take Action
              </NavLink>
              <div className="pt-4">
                {isLoggedIn ? (
                  <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                    <Button fullWidth>Dashboard</Button>
                  </Link>
                ) : (
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button fullWidth>Staff Login</Button>
                  </Link>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </header>
  )
}

export default Header
