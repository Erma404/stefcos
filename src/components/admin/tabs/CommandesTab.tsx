import { useState, useMemo } from 'react'
import { Pencil, Trash2, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { Commande, CommandeStatut, CommandePaiement, DateRange, CommandeFilters } from '@/hooks/useCommandes'
import { useCommandes, useDeleteCommande } from '@/hooks/useCommandes'
import CommandeModal from '@/components/admin/modals/CommandeModal'

function formatFcfa(amount: number | null): string {
  if (amount === null) return '—'
  return new Intl.NumberFormat('fr-FR').format(amount) + ' F'
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function statutBadge(statut: CommandeStatut) {
  const map: Record<CommandeStatut, string> = {
    'Nouvelle commande': 'bg-blue-900 text-blue-300 border-blue-800',
    'En préparation': 'bg-amber-900 text-amber-300 border-amber-800',
    'En livraison': 'bg-violet-900 text-violet-300 border-violet-800',
    Livrée: 'bg-green-900 text-green-300 border-green-800',
    Annulée: 'bg-gray-800 text-gray-400 border-gray-700',
    Problème: 'bg-red-900 text-red-300 border-red-800',
  }
  return map[statut] || 'bg-gray-800 text-gray-400 border-gray-700'
}

function paiementBadge(paiement: CommandePaiement) {
  if (paiement === 'Payé') return 'bg-green-900 text-green-300 border-green-800'
  if (paiement === 'Partiel') return 'bg-amber-900 text-amber-300 border-amber-800'
  return 'bg-red-900 text-red-300 border-red-800'
}

const DATE_BUTTONS: { label: string; value: DateRange }[] = [
  { label: "Aujourd'hui", value: 'today' },
  { label: 'Semaine', value: 'week' },
  { label: 'Mois', value: 'month' },
  { label: 'Tout', value: 'all' },
]

export default function CommandesTab() {
  const [statut, setStatut] = useState<CommandeStatut | 'all'>('all')
  const [paiement, setPaiement] = useState<CommandePaiement | 'all'>('all')
  const [dateRange, setDateRange] = useState<DateRange>('all')
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedCommande, setSelectedCommande] = useState<Commande | undefined>()

  const filters: CommandeFilters = { statut, paiement, dateRange }
  const { data: commandes = [], isLoading } = useCommandes(filters)
  const deleteCommande = useDeleteCommande()

  const filtered = useMemo(() => {
    if (!search.trim()) return commandes
    const q = search.toLowerCase()
    return commandes.filter(
      (c) =>
        c.nom_client.toLowerCase().includes(q) ||
        (c.telephone ?? '').toLowerCase().includes(q)
    )
  }, [commandes, search])

  const handleDelete = async (id: string) => {
    if (window.confirm(`Supprimer la commande ${id} ? Cette action est irréversible.`)) {
      await deleteCommande.mutateAsync(id)
    }
  }

  const openCreate = () => {
    setSelectedCommande(undefined)
    setModalOpen(true)
  }

  const openEdit = (commande: Commande) => {
    setSelectedCommande(commande)
    setModalOpen(true)
  }

  return (
    <div className="p-6 space-y-5">
      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <Select
          value={statut}
          onValueChange={(v) => setStatut(v as CommandeStatut | 'all')}
        >
          <SelectTrigger className="w-48 bg-gray-900 border-gray-700 text-white">
            <SelectValue placeholder="Tous les statuts" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700 text-white">
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="Nouvelle commande">Nouvelle commande</SelectItem>
            <SelectItem value="En préparation">En préparation</SelectItem>
            <SelectItem value="En livraison">En livraison</SelectItem>
            <SelectItem value="Livrée">Livrée</SelectItem>
            <SelectItem value="Annulée">Annulée</SelectItem>
            <SelectItem value="Problème">Problème</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={paiement}
          onValueChange={(v) => setPaiement(v as CommandePaiement | 'all')}
        >
          <SelectTrigger className="w-40 bg-gray-900 border-gray-700 text-white">
            <SelectValue placeholder="Paiement" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700 text-white">
            <SelectItem value="all">Tous</SelectItem>
            <SelectItem value="Payé">Payé</SelectItem>
            <SelectItem value="Non payé">Non payé</SelectItem>
            <SelectItem value="Partiel">Partiel</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex gap-1">
          {DATE_BUTTONS.map((btn) => (
            <button
              key={btn.value}
              onClick={() => setDateRange(btn.value)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                dateRange === btn.value
                  ? 'bg-white text-black'
                  : 'bg-gray-900 border border-gray-700 text-gray-300 hover:bg-gray-800'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        <Input
          placeholder="Rechercher client ou tel..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-52 bg-gray-900 border-gray-700 text-white placeholder:text-gray-500"
        />

        <div className="ml-auto">
          <Button
            onClick={openCreate}
            className="bg-white text-black hover:bg-gray-100 gap-2"
          >
            <Plus className="w-4 h-4" />
            Nouvelle commande
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-gray-800 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-800 hover:bg-transparent">
              <TableHead className="text-gray-400">ID</TableHead>
              <TableHead className="text-gray-400">Date</TableHead>
              <TableHead className="text-gray-400">Client</TableHead>
              <TableHead className="text-gray-400">Tél</TableHead>
              <TableHead className="text-gray-400">Zone</TableHead>
              <TableHead className="text-gray-400">Produits</TableHead>
              <TableHead className="text-gray-400">Montant</TableHead>
              <TableHead className="text-gray-400">Paiement</TableHead>
              <TableHead className="text-gray-400">Statut</TableHead>
              <TableHead className="text-gray-400">Coursier</TableHead>
              <TableHead className="text-gray-400">Priorité</TableHead>
              <TableHead className="text-gray-400">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={12} className="text-center py-10">
                  <div className="flex items-center justify-center gap-2 text-gray-400">
                    <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                    Chargement...
                  </div>
                </TableCell>
              </TableRow>
            ) : filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={12} className="text-center py-10 text-gray-500">
                  Aucune commande trouvée.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((c) => (
                <TableRow key={c.id} className="border-gray-800 hover:bg-gray-900/50">
                  <TableCell className="text-gray-300 font-mono text-xs">{c.id}</TableCell>
                  <TableCell className="text-gray-400 text-xs whitespace-nowrap">
                    {formatDate(c.created_at)}
                  </TableCell>
                  <TableCell className="text-white font-medium">{c.nom_client}</TableCell>
                  <TableCell className="text-gray-400 text-sm">{c.telephone ?? '—'}</TableCell>
                  <TableCell className="text-gray-400 text-sm">{c.quartier_zone ?? '—'}</TableCell>
                  <TableCell className="text-gray-400 text-sm max-w-[120px] truncate">
                    {c.produits ?? '—'}
                  </TableCell>
                  <TableCell className="text-white text-sm whitespace-nowrap">
                    {formatFcfa(c.montant_fcfa)}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`text-xs px-2 py-1 rounded-full border ${paiementBadge(
                        c.paiement
                      )}`}
                    >
                      {c.paiement}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`text-xs px-2 py-1 rounded-full border ${statutBadge(c.statut)}`}
                    >
                      {c.statut}
                    </span>
                  </TableCell>
                  <TableCell className="text-gray-400 text-sm">
                    {c.coursier_assigne ?? '—'}
                  </TableCell>
                  <TableCell>
                    {c.priorite === 'Urgente' ? (
                      <Badge className="bg-red-900 text-red-300 border border-red-800 hover:bg-red-900">
                        Urgente
                      </Badge>
                    ) : (
                      <span className="text-gray-500 text-sm">Normale</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <button
                        onClick={() => openEdit(c)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                        title="Modifier"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(c.id)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-gray-800 transition-colors"
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

      <p className="text-gray-500 text-sm">
        {filtered.length} commande{filtered.length > 1 ? 's' : ''}
      </p>

      <CommandeModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        commande={selectedCommande}
      />
    </div>
  )
}
