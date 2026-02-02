import { ReactNode, useState } from 'react'

interface Tab {
  id: string
  label: string
  content: ReactNode
}

interface TabsProps {
  tabs: Tab[]
  defaultTab?: string
  className?: string
}

export default function Tabs({ tabs, defaultTab, className = '' }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id)

  return (
    <div className={className}>
      <div className="flex border-b border-gray-200 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 font-medium text-sm whitespace-nowrap transition-colors min-h-[44px] ${
              activeTab === tab.id
                ? 'text-ct-teal border-b-2 border-ct-teal'
                : 'text-gray-500 hover:text-ct-navy'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="py-4">
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  )
}
