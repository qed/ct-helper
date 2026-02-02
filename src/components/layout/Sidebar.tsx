import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  LogOut,
  LucideIcon
} from 'lucide-react'
import { cn } from '../../lib/utils'
import { useAppContext } from '../../App'

export function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { setIsLoggedIn } = useAppContext()

  const handleLogout = () => {
    setIsLoggedIn(false)
    navigate('/')
  }

  const NavItem = ({
    to,
    icon: Icon,
    label
  }: {
    to: string
    icon: LucideIcon
    label: string
  }) => {
    const isActive = location.pathname === to ||
      (to === '/crm' && location.pathname.startsWith('/crm') && !location.pathname.includes('follow-ups'))

    return (
      <Link
        to={to}
        className={cn(
          'flex items-center gap-3 px-4 py-3 rounded-md transition-colors text-sm font-medium',
          isActive
            ? 'bg-primary text-white shadow-sm'
            : 'text-text-secondary hover:bg-gray-100 hover:text-primary'
        )}
      >
        <Icon size={20} />
        {label}
      </Link>
    )
  }

  return (
    <aside className="hidden lg:flex flex-col w-64 border-r border-gray-200 bg-white min-h-[calc(100vh-64px)] p-4">
      <div className="space-y-1">
        <NavItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
        <NavItem to="/crm" icon={Users} label="CRM Directory" />
        <NavItem to="/crm/follow-ups" icon={ClipboardList} label="Follow-ups" />
      </div>

      <div className="mt-auto pt-4 border-t border-gray-100 space-y-1">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-md transition-colors text-sm font-medium text-red-600 hover:bg-red-50"
        >
          <LogOut size={20} />
          Sign Out
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
