import { useState } from 'react'
import { Pencil, Trash2, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { Coursier, CoursierDisponibilite } from '@/hooks/useCoursiers'
import { useCoursiers, useUpdateCoursier, useDeleteCoursier } from '@/hooks/useCoursiers'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import type { Commande } from '@/hooks/useCommandes'
import CoursierModal from '@/components/admin/modals/CoursierModal'

function dispBadgeClass(dispo: CoursierDisponibilite): string {
  if (dispo === 'Disponible') return 'text-green-600'
  if (dispo === 'En livraison') return 'text-amber-600'
  return 'text-gray-400'
}

export default function CoursiersTab() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedCoursier, setSelectedCoursier] = useState<Coursier | undefined>()

  const { data: coursiers = [], isLoading } = useCoursiers()
  const updateCoursier = useUpdateCoursier()
  const deleteCoursier = useDeleteCoursier()

  const { data: allCommandes = [] } = useQuery<Commande[]>({
    queryKey: ['commandes-coursiers'],
    queryFn: async () => {
      const { data, error } = await supabase.from('commandes').select('*')
      if (error) return []
      return (data ?? []) as Commande[]
    },
  })

  const getLivraisonsCount = (nom: string) =>
    allCommandes.filter((c) => c.coursier_assigne === nom).length

  const handleDispoChange = async (coursier: Coursier, dispo: CoursierDisponibilite) => {
    await updateCoursier.mutateAsync({ id: coursier.id, disponibilite: dispo })
  }

  const handleDelete = async (id: string, nom: string) => {
    if (window.confirm(`Supprimer le coursier "${nom}" ? Cette action est irréversible.`)) {
      await deleteCoursier.mutateAsync(id)
    }
  }

  const openCreate = () => {
    setSelectedCoursier(undefined)
    setModalOpen(true)
  }

  const openEdit = (coursier: Coursier) => {
    setSelectedCoursier(coursier)
    setModalOpen(true)
  }

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-gray-900 text-xl font-semibold">Coursiers</h2>
        <Button
          onClick={openCreate}
          className="bg-gray-900 text-white hover:bg-gray-800 gap-2"
        >
          <Plus className="w-4 h-4" />
          Ajouter coursier
        </Button>
      </div>

      <div className="rounded-xl border border-gray-200 overflow-x-auto bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-200 hover:bg-transparent bg-gray-50">
              <TableHead className="text-gray-500">Nom</TableHead>
              <TableHead className="text-gray-500">Téléphone</TableHead>
              <TableHead className="text-gray-500">Zone</TableHead>
              <TableHead className="text-gray-500">Disponibilité</TableHead>
              <TableHead className="text-gray-500">Nb livraisons</TableHead>
              <TableHead className="text-gray-500">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10">
                  <div className="flex items-center justify-center gap-2 text-gray-400">
                    <div className="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
                    Chargement...
                  </div>
                </TableCell>
              </TableRow>
            ) : coursiers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10 text-gray-400">
                  Aucun coursier enregistré.
                </TableCell>
              </TableRow>
            ) : (
              coursiers.map((co) => (
                <TableRow key={co.id} className="border-gray-100 hover:bg-gray-50">
                  <TableCell className="text-gray-900 font-medium">{co.nom}</TableCell>
                  <TableCell className="text-gray-500 text-sm">{co.telephone ?? '—'}</TableCell>
                  <TableCell className="text-gray-500 text-sm">{co.zone ?? '—'}</TableCell>
                  <TableCell>
                    <Select
                      value={co.disponibilite}
                      onValueChange={(v) => handleDispoChange(co, v as CoursierDisponibilite)}
                    >
                      <SelectTrigger
                        className={`w-40 bg-white border-gray-300 text-sm h-8 ${dispBadgeClass(co.disponibilite)}`}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-gray-200 text-gray-900">
                        <SelectItem value="Disponible">Disponible</SelectItem>
                        <SelectItem value="En livraison">En livraison</SelectItem>
                        <SelectItem value="Hors service">Hors service</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-gray-700 text-sm">
                    {getLivraisonsCount(co.nom)} livraison{getLivraisonsCount(co.nom) > 1 ? 's' : ''}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <button
                        onClick={() => openEdit(co)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                        title="Modifier"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(co.id, co.nom)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-gray-100 transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <CoursierModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        coursier={selectedCoursier}
      />
    </div>
  )
}
