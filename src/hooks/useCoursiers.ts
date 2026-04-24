import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'

export type CoursierDisponibilite = 'Disponible' | 'En livraison' | 'Hors service'

export interface Coursier {
  id: string
  nom: string
  telephone: string | null
  zone: string | null
  disponibilite: CoursierDisponibilite
  created_at: string
}

export function useCoursiers() {
  return useQuery<Coursier[]>({
    queryKey: ['coursiers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('coursiers')
        .select('*')
        .order('nom', { ascending: true })
      if (error) return []
      return (data ?? []) as Coursier[]
    },
  })
}

export function useCreateCoursier() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (coursier: Omit<Coursier, 'id' | 'created_at'>) => {
      const { data, error } = await supabase.from('coursiers').insert([coursier]).select().single()
      if (error) throw new Error(error.message)
      return data as Coursier
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coursiers'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard'] })
    },
  })
}

export function useUpdateCoursier() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Coursier> & { id: string }) => {
      const { data, error } = await supabase
        .from('coursiers')
        .update(updates)
        .eq('id', id)
        .select()
        .single()
      if (error) throw new Error(error.message)
      return data as Coursier
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coursiers'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard'] })
    },
  })
}

export function useDeleteCoursier() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('coursiers').delete().eq('id', id)
      if (error) throw new Error(error.message)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coursiers'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard'] })
    },
  })
}
