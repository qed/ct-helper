import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { createContext, useContext, ReactNode } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
import { Interaction } from './data/interactions'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { Sidebar } from './components/layout/Sidebar'
import Home from './pages/Home'
import Campaigns from './pages/Campaigns'
import CampaignDetail from './pages/CampaignDetail'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import CRM from './pages/CRM'
import ContactDetailPage from './pages/ContactDetail'
import FollowUps from './pages/FollowUps'

interface UserInfo {
  name: string
  email: string
}

interface AppContextType {
  isLoggedIn: boolean
  setIsLoggedIn: (value: boolean) => void
  userInfo: UserInfo
  setUserInfo: (value: UserInfo) => void
  interactions: Interaction[]
  addInteraction: (interaction: Interaction) => void
}

const AppContext = createContext<AppContextType | null>(null)

export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider')
  }
  return context
}

function AppProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage('ct-logged-in', false)
  const [userInfo, setUserInfo] = useLocalStorage<UserInfo>('ct-user-info', {
    name: '',
    email: ''
  })
  const [interactions, setInteractions] = useLocalStorage<Interaction[]>('ct-interactions', [])

  const addInteraction = (interaction: Interaction) => {
    setInteractions([interaction, ...interactions])
  }

  return (
    <AppContext.Provider value={{
      isLoggedIn,
      setIsLoggedIn,
      userInfo,
      setUserInfo,
      interactions,
      addInteraction
    }}>
      {children}
    </AppContext.Provider>
  )
}

// Public layout with Header + Footer
function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}

// Admin layout with Header + Sidebar (no footer)
function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

// Protected route wrapper
function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isLoggedIn } = useAppContext()
  const location = useLocation()

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
      <Route path="/campaigns" element={<PublicLayout><Campaigns /></PublicLayout>} />
      <Route path="/campaigns/:id" element={<PublicLayout><CampaignDetail /></PublicLayout>} />
      <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />

      {/* Admin Routes (Protected) */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <AdminLayout><Dashboard /></AdminLayout>
        </ProtectedRoute>
      } />
      <Route path="/crm" element={
        <ProtectedRoute>
          <AdminLayout><CRM /></AdminLayout>
        </ProtectedRoute>
      } />
      <Route path="/crm/contacts/:id" element={
        <ProtectedRoute>
          <AdminLayout><ContactDetailPage /></AdminLayout>
        </ProtectedRoute>
      } />
      <Route path="/crm/follow-ups" element={
        <ProtectedRoute>
          <AdminLayout><FollowUps /></AdminLayout>
        </ProtectedRoute>
      } />
    </Routes>
  )
}

function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  )
}

export default App
