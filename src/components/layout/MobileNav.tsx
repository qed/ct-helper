import { Link, useLocation } from 'react-router-dom'
import { Home, Megaphone, LayoutDashboard, Users, Bell } from 'lucide-react'
import { useAppContext } from '../../App'

export default function MobileNav() {
  const { isLoggedIn } = useAppContext()
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  const publicItems = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/campaigns', icon: Megaphone, label: 'Action' },
  ]

  const staffItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/crm', icon: Users, label: 'CRM' },
    { to: '/crm/follow-ups', icon: Bell, label: 'Follow-ups' },
  ]

  const items = isLoggedIn ? [...publicItems, ...staffItems] : publicItems

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
      <div className="flex items-center justify-around">
        {items.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`flex flex-col items-center py-2 px-3 min-h-[56px] min-w-[56px] ${
              isActive(item.to) ? 'text-ct-teal' : 'text-gray-500'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}
