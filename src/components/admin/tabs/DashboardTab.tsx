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
    blue: 'text-blue-400',
    green: 'text-green-400',
    amber: 'text-amber-400',
    violet: 'text-violet-400',
    red: 'text-red-400',
    default: 'text-white',
  }
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
      <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">{label}</p>
      <p className={`text-2xl font-bold ${accentMap[accent]}`}>{value}</p>
      {sub && <p className="text-gray-500 text-xs mt-1">{sub}</p>}
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

  // Aujourd'hui counts
  const nouvellesAujourdhui = todayCommandes.filter((c) => c.statut === 'Nouvelle commande').length
  const enAttentePaiement = todayCommandes.filter((c) => c.paiement === 'Non payé').length
  const payeesAujourdhui = todayCommandes.filter(
    (c) => c.paiement === 'Payé' && isToday(c.created_at)
  ).length
  const enLivraison = allCommandes.filter((c) => c.statut === 'En livraison').length
  const livreesAujourdhui = todayCommandes.filter((c) => c.statut === 'Livrée').length
  const problemes = allCommandes.filter((c) => c.statut === 'Problème').length

  // CA
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

  // Coursiers avec nb livraisons du jour
  const coursierStats = coursiers.map((co) => {
    const livraisonsJour = todayCommandes.filter(
      (c) => c.coursier_assigne === co.nom && c.statut === 'Livrée'
    ).length
    return { ...co, livraisonsJour }
  })

  const dispBadge = (dispo: string) => {
    if (dispo === 'Disponible') return 'bg-green-900 text-green-300 border border-green-800'
    if (dispo === 'En livraison') return 'bg-amber-900 text-amber-300 border border-amber-800'
    return 'bg-gray-800 text-gray-400 border border-gray-700'
  }

  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-white text-xl font-semibold">Vue d'ensemble</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => queryClient.invalidateQueries()}
          className="bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Actualiser
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <>
          {/* Aujourd'hui */}
          <section>
            <h3 className="text-gray-400 text-xs uppercase tracking-widest mb-4">
              Aujourd'hui ({todayCommandes.length} commande{todayCommandes.length > 1 ? 's' : ''})
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              <StatCard
                label="Nouvelles"
                value={nouvellesAujourdhui}
                accent="blue"
              />
              <StatCard
                label="En attente paiement"
                value={enAttentePaiement}
                accent="amber"
              />
              <StatCard
                label="Payées"
                value={payeesAujourdhui}
                accent="green"
              />
              <StatCard
                label="En livraison"
                value={enLivraison}
                accent="violet"
              />
              <StatCard
                label="Livrées"
                value={livreesAujourdhui}
                accent="green"
              />
              <StatCard
                label="Problèmes"
                value={problemes}
                accent="red"
              />
            </div>
          </section>

          {/* Chiffre d'affaires */}
          <section>
            <h3 className="text-gray-400 text-xs uppercase tracking-widest mb-4">
              Chiffre d'affaires
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                label="CA Aujourd'hui"
                value={formatFcfa(caAujourdhui)}
                accent="green"
              />
              <StatCard
                label="CA Ce mois"
                value={formatFcfa(caMois)}
                accent="blue"
              />
              <StatCard
                label="CA Total"
                value={formatFcfa(caTotal)}
              />
              <StatCard
                label="Panier moyen"
                value={formatFcfa(panierMoyen)}
                sub={`${paidCommandes.length} commande${paidCommandes.length > 1 ? 's' : ''} payée${paidCommandes.length > 1 ? 's' : ''}`}
              />
            </div>
          </section>

          {/* Coursiers */}
          {coursierStats.length > 0 && (
            <section>
              <h3 className="text-gray-400 text-xs uppercase tracking-widest mb-4">
                Coursiers
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {coursierStats.map((co) => (
                  <div
                    key={co.id}
                    className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex items-start justify-between"
                  >
                    <div>
                      <p className="text-white font-medium">{co.nom}</p>
                      {co.zone && (
                        <p className="text-gray-500 text-sm mt-0.5">{co.zone}</p>
                      )}
                      <p className="text-gray-400 text-sm mt-2">
                        {co.livraisonsJour} livraison{co.livraisonsJour > 1 ? 's' : ''} aujourd'hui
                      </p>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${dispBadge(co.disponibilite)}`}
                    >
                      {co.disponibilite}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {monthCommandes.length === 0 && allCommandes.length === 0 && (
            <div className="text-center py-16 text-gray-500">
              Aucune commande enregistrée pour le moment.
            </div>
          )}
        </>
      )}
    </div>
  )
}
