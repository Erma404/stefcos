import { useState } from 'react'
import { useAdminAuth } from '@/hooks/useAdminAuth'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'
import DashboardTab from '@/components/admin/tabs/DashboardTab'
import CommandesTab from '@/components/admin/tabs/CommandesTab'
import CoursiersTab from '@/components/admin/tabs/CoursiersTab'

type TabId = 'dashboard' | 'commandes' | 'coursiers'

const TABS: { id: TabId; label: string }[] = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'commandes', label: 'Commandes' },
  { id: 'coursiers', label: 'Coursiers' },
]

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<TabId>('dashboard')
  const { signOut } = useAdminAuth()

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-50 h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
        <span className="font-serif tracking-widest text-gray-900 font-bold uppercase text-lg">
          STEFCOS
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSignOut}
          className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 gap-2"
        >
          <LogOut className="w-4 h-4" />
          Déconnexion
        </Button>
      </header>

      {/* Tabs nav */}
      <div className="fixed top-14 inset-x-0 z-40 bg-white border-b border-gray-200 px-6 flex gap-1">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
              activeTab === tab.id
                ? 'border-gray-900 text-gray-900'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <main className="pt-[calc(3.5rem+2.75rem)]">
        {activeTab === 'dashboard' && <DashboardTab />}
        {activeTab === 'commandes' && <CommandesTab />}
        {activeTab === 'coursiers' && <CoursiersTab />}
      </main>
    </div>
  )
}
