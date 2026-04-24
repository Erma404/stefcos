import { useQueryClient, useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import type { Commande } from '@/hooks/useCommandes'
import { useCoursiers } from '@/hooks/useCoursiers'
import { Button } from '@/components/ui/button'
import { RefreshCw } from 'lucide-react'

function formatFcfa(amount: number): string {
  return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA'
}

function isToday(dateStr: string): boolean {
  const today = new Date().toISOString().split('T')[0]
  return dateStr.startsWith(today)
}

function isThisMonth(dateStr: string): boolean {
  const now = new Date()
  const d = new Date(dateStr)
  return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth()
}

interface StatCardProps {
  label: string
  value: string | number
  sub?: string
  accent?: 'blue' | 'green' | 'amber' | 'violet' | 'red' | 'default'
}

function StatCard({ label, value, sub, accent = 'default' }: StatCardProps) {
  const accentMap: Record<string, string> = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    amber: 'text-amber-600',
    violet: 'text-violet-600',
    red: 'text-red-600',
    default: 'text-gray-900',
  }
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      <p className="text-gray-500 text-xs uppercase tracking-wider mb-2">{label}</p>
      <p className={`text-2xl font-bold ${accentMap[accent]}`}>{value}</p>
      {sub && <p className="text-gray-400 text-xs mt-1">{sub}</p>}
    </div>
  )
}

export default function DashboardTab() {
  const queryClient = useQueryClient()
  const { data: coursiers = [] } = useCoursiers()

  const { data: allCommandes = [], isLoading } = useQuery<Commande[]>({
    queryKey: ['dashboard'],
    queryFn: async () => {
      const { data, error } = await supabase.from('commandes').select('*')
      if (error) return []
      return (data ?? []) as Commande[]
    },
  })

  const todayCommandes = allCommandes.filter((c) => isToday(c.created_at))
  const monthCommandes = allCommandes.filter((c) => isThisMonth(c.created_at))

  const nouvellesAujourdhui = todayCommandes.filter((c) => c.statut === 'Nouvelle commande').length
  const enAttentePaiement = todayCommandes.filter((c) => c.paiement === 'Non payé').length
  const payeesAujourdhui = todayCommandes.filter(
    (c) => c.paiement === 'Payé' && isToday(c.created_at)
  ).length
  const enLivraison = allCommandes.filter((c) => c.statut === 'En livraison').length
  const livreesAujourdhui = todayCommandes.filter((c) => c.statut === 'Livrée').length
  const problemes = allCommandes.filter((c) => c.statut === 'Problème').length

  const paidCommandes = allCommandes.filter((c) => c.paiement === 'Payé' && c.montant_fcfa)
  const caAujourdhui = paidCommandes
    .filter((c) => isToday(c.created_at))
    .reduce((sum, c) => sum + (c.montant_fcfa ?? 0), 0)
  const caMois = paidCommandes
    .filter((c) => isThisMonth(c.created_at))
    .reduce((sum, c) => sum + (c.montant_fcfa ?? 0), 0)
  const caTotal = paidCommandes.reduce((sum, c) => sum + (c.montant_fcfa ?? 0), 0)
  const panierMoyen =
    paidCommandes.length > 0 ? Math.round(caTotal / paidCommandes.length) : 0

  const coursierStats = coursiers.map((co) => {
    const livraisonsJour = todayCommandes.filter(
      (c) => c.coursier_assigne === co.nom && c.statut === 'Livrée'
    ).length
    return { ...co, livraisonsJour }
  })

  const dispBadge = (dispo: string) => {
    if (dispo === 'Disponible') return 'bg-green-50 text-green-700 border border-green-200'
    if (dispo === 'En livraison') return 'bg-amber-50 text-amber-700 border border-amber-200'
    return 'bg-gray-100 text-gray-500 border border-gray-200'
  }

  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-gray-900 text-xl font-semibold">Vue d'ensemble</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => queryClient.invalidateQueries()}
          className="border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-gray-900 gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Actualiser
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <>
          <section>
            <h3 className="text-gray-500 text-xs uppercase tracking-widest mb-4">
              Aujourd'hui ({todayCommandes.length} commande{todayCommandes.length > 1 ? 's' : ''})
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              <StatCard label="Nouvelles" value={nouvellesAujourdhui} accent="blue" />
              <StatCard label="En attente paiement" value={enAttentePaiement} accent="amber" />
              <StatCard label="Payées" value={payeesAujourdhui} accent="green" />
              <StatCard label="En livraison" value={enLivraison} accent="violet" />
              <StatCard label="Livrées" value={livreesAujourdhui} accent="green" />
              <StatCard label="Problèmes" value={problemes} accent="red" />
            </div>
          </section>

          <section>
            <h3 className="text-gray-500 text-xs uppercase tracking-widest mb-4">
              Chiffre d'affaires
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard label="CA Aujourd'hui" value={formatFcfa(caAujourdhui)} accent="green" />
              <StatCard label="CA Ce mois" value={formatFcfa(caMois)} accent="blue" />
              <StatCard label="CA Total" value={formatFcfa(caTotal)} />
              <StatCard
                label="Panier moyen"
                value={formatFcfa(panierMoyen)}
                sub={`${paidCommandes.length} commande${paidCommandes.length > 1 ? 's' : ''} payée${paidCommandes.length > 1 ? 's' : ''}`}
              />
            </div>
          </section>

          {coursierStats.length > 0 && (
            <section>
              <h3 className="text-gray-500 text-xs uppercase tracking-widest mb-4">Coursiers</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {coursierStats.map((co) => (
                  <div
                    key={co.id}
                    className="bg-white border border-gray-200 rounded-xl p-5 flex items-start justify-between shadow-sm"
                  >
                    <div>
                      <p className="text-gray-900 font-medium">{co.nom}</p>
                      {co.zone && <p className="text-gray-400 text-sm mt-0.5">{co.zone}</p>}
                      <p className="text-gray-500 text-sm mt-2">
                        {co.livraisonsJour} livraison{co.livraisonsJour > 1 ? 's' : ''} aujourd'hui
                      </p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${dispBadge(co.disponibilite)}`}>
                      {co.disponibilite}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {monthCommandes.length === 0 && allCommandes.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              Aucune commande enregistrée pour le moment.
            </div>
          )}
        </>
      )}
    </div>
  )
}
