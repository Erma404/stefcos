import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'

export type CommandeStatut =
  | 'Nouvelle commande'
  | 'En préparation'
  | 'En livraison'
  | 'Livrée'
  | 'Annulée'
  | 'Problème'

export type CommandePaiement = 'Payé' | 'Non payé' | 'Partiel'

export type CommandePriorite = 'Normale' | 'Urgente'

export type CommandeMode = 'WhatsApp' | 'Appel' | 'Instagram' | 'Sur place'

export interface Commande {
  id: string
  nom_client: string
  telephone: string | null
  quartier_zone: string | null
  produits: string | null
  montant_fcfa: number | null
  paiement: CommandePaiement
  statut: CommandeStatut
  coursier_assigne: string | null
  mode_commande: CommandeMode | null
  priorite: CommandePriorite
  created_at: string
}

export type DateRange = 'today' | 'week' | 'month' | 'all'

export interface CommandeFilters {
  statut?: CommandeStatut | 'all'
  paiement?: CommandePaiement | 'all'
  dateRange?: DateRange
}

function buildDateFilter(dateRange: DateRange | undefined): string | null {
  if (!dateRange || dateRange === 'all') return null
  const now = new Date()
  if (dateRange === 'today') {
    return now.toISOString().split('T')[0]
  }
  if (dateRange === 'week') {
    const d = new Date(now)
    d.setDate(d.getDate() - 7)
    return d.toISOString()
  }
  if (dateRange === 'month') {
    const d = new Date(now)
    d.setMonth(d.getMonth() - 1)
    return d.toISOString()
  }
  return null
}

export function useCommandes(filters?: CommandeFilters) {
  return useQuery<Commande[]>({
    queryKey: ['commandes', filters],
    queryFn: async () => {
      let query = supabase.from('commandes').select('*').order('created_at', { ascending: false })

      if (filters?.statut && filters.statut !== 'all') {
        query = query.eq('statut', filters.statut)
      }
      if (filters?.paiement && filters.paiement !== 'all') {
        query = query.eq('paiement', filters.paiement)
      }

      const dateFilter = buildDateFilter(filters?.dateRange)
      if (dateFilter) {
        if (filters?.dateRange === 'today') {
          query = query.gte('created_at', dateFilter + 'T00:00:00').lte('created_at', dateFilter + 'T23:59:59')
        } else {
          query = query.gte('created_at', dateFilter)
        }
      }

      const { data, error } = await query
      if (error) return []
      return (data ?? []) as Commande[]
    },
  })
}

export function useCreateCommande() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (commande: Omit<Commande, 'created_at'>) => {
      const { data, error } = await supabase.from('commandes').insert([commande]).select().single()
      if (error) throw new Error(error.message)
      return data as Commande
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['commandes'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard'] })
    },
  })
}

export function useUpdateCommande() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Commande> & { id: string }) => {
      const { data, error } = await supabase
        .from('commandes')
        .update(updates)
        .eq('id', id)
        .select()
        .single()
      if (error) throw new Error(error.message)
      return data as Commande
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['commandes'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard'] })
    },
  })
}

export function useDeleteCommande() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('commandes').delete().eq('id', id)
      if (error) throw new Error(error.message)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['commandes'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard'] })
    },
  })
}
