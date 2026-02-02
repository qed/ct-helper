import { Routes, Route } from 'react-router-dom'
import { createContext, useContext, ReactNode } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
import { Interaction } from './data/interactions'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
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

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/campaigns/:id" element={<CampaignDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/crm" element={<CRM />} />
            <Route path="/crm/contacts/:id" element={<ContactDetailPage />} />
            <Route path="/crm/follow-ups" element={<FollowUps />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AppProvider>
  )
}

export default App
