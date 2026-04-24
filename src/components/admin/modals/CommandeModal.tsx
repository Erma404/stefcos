import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'
import type { Commande } from '@/hooks/useCommandes'
import { useCreateCommande, useUpdateCommande } from '@/hooks/useCommandes'
import { useCoursiers } from '@/hooks/useCoursiers'

const schema = z.object({
  nom_client: z.string().min(1, 'Nom client requis'),
  telephone: z.string().optional(),
  quartier_zone: z.string().optional(),
  produits: z.string().optional(),
  montant_fcfa: z.number().nullable().optional(),
  paiement: z.enum(['Payé', 'Non payé', 'Partiel']),
  statut: z.enum([
    'Nouvelle commande',
    'En préparation',
    'En livraison',
    'Livrée',
    'Annulée',
    'Problème',
  ]),
  coursier_assigne: z.string().optional(),
  mode_commande: z.enum(['WhatsApp', 'Appel', 'Instagram', 'Sur place']).optional(),
  priorite: z.enum(['Normale', 'Urgente']),
})

type FormValues = z.infer<typeof schema>

interface CommandeModalProps {
  open: boolean
  onClose: () => void
  commande?: Commande
}

async function generateNextId(): Promise<string> {
  const { data } = await supabase
    .from('commandes')
    .select('id')
    .order('id', { ascending: false })
    .limit(1)

  if (!data || data.length === 0) return 'STF-001'
  const lastId = data[0].id as string
  const match = lastId.match(/STF-(\d+)/)
  if (!match) return 'STF-001'
  const nextNum = parseInt(match[1], 10) + 1
  return `STF-${String(nextNum).padStart(3, '0')}`
}

export default function CommandeModal({ open, onClose, commande }: CommandeModalProps) {
  const createCommande = useCreateCommande()
  const updateCommande = useUpdateCommande()
  const { data: coursiers = [] } = useCoursiers()
  const isEditing = !!commande

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      nom_client: '',
      telephone: '',
      quartier_zone: '',
      produits: '',
      montant_fcfa: null,
      paiement: 'Non payé',
      statut: 'Nouvelle commande',
      coursier_assigne: '',
      mode_commande: undefined,
      priorite: 'Normale',
    },
  })

  useEffect(() => {
    if (commande) {
      form.reset({
        nom_client: commande.nom_client,
        telephone: commande.telephone ?? '',
        quartier_zone: commande.quartier_zone ?? '',
        produits: commande.produits ?? '',
        montant_fcfa: commande.montant_fcfa ?? null,
        paiement: commande.paiement,
        statut: commande.statut,
        coursier_assigne: commande.coursier_assigne ?? '',
        mode_commande: commande.mode_commande ?? undefined,
        priorite: commande.priorite,
      })
    } else {
      form.reset({
        nom_client: '',
        telephone: '',
        quartier_zone: '',
        produits: '',
        montant_fcfa: null,
        paiement: 'Non payé',
        statut: 'Nouvelle commande',
        coursier_assigne: '',
        mode_commande: undefined,
        priorite: 'Normale',
      })
    }
  }, [commande, open, form])

  const onSubmit = async (values: FormValues) => {
    const payload = {
      nom_client: values.nom_client,
      telephone: values.telephone || null,
      quartier_zone: values.quartier_zone || null,
      produits: values.produits || null,
      montant_fcfa: values.montant_fcfa ?? null,
      paiement: values.paiement,
      statut: values.statut,
      coursier_assigne: values.coursier_assigne || null,
      mode_commande: values.mode_commande || null,
      priorite: values.priorite,
    }

    if (isEditing && commande) {
      await updateCommande.mutateAsync({ id: commande.id, ...payload })
    } else {
      const newId = await generateNextId()
      await createCommande.mutateAsync({ id: newId, ...payload })
    }
    onClose()
  }

  const isPending = createCommande.isPending || updateCommande.isPending

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="bg-white border border-gray-200 text-gray-900 max-w-2xl max-h-[90vh] overflow-y-auto shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-gray-900">
            {isEditing ? `Modifier ${commande?.id}` : 'Nouvelle commande'}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-2">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="nom_client"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Nom client *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="telephone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Téléphone</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="quartier_zone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Quartier / Zone</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="produits"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Produits</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={3}
                      className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="montant_fcfa"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Montant (FCFA)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        value={field.value ?? ''}
                        onChange={(e) =>
                          field.onChange(e.target.value ? Number(e.target.value) : null)
                        }
                        className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="paiement"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Paiement</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-white border-gray-300 text-gray-900">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white border-gray-200 text-gray-900">
                        <SelectItem value="Non payé">Non payé</SelectItem>
                        <SelectItem value="Payé">Payé</SelectItem>
                        <SelectItem value="Partiel">Partiel</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="statut"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Statut</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-white border-gray-300 text-gray-900">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white border-gray-200 text-gray-900">
                        <SelectItem value="Nouvelle commande">Nouvelle commande</SelectItem>
                        <SelectItem value="En préparation">En préparation</SelectItem>
                        <SelectItem value="En livraison">En livraison</SelectItem>
                        <SelectItem value="Livrée">Livrée</SelectItem>
                        <SelectItem value="Annulée">Annulée</SelectItem>
                        <SelectItem value="Problème">Problème</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="coursier_assigne"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Coursier assigné</FormLabel>
                    <Select onValueChange={(v) => field.onChange(v === '__none__' ? '' : v)} value={field.value || '__none__'}>
                      <FormControl>
                        <SelectTrigger className="bg-white border-gray-300 text-gray-900">
                          <SelectValue placeholder="— Aucun —" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white border-gray-200 text-gray-900">
                        <SelectItem value="__none__">— Aucun —</SelectItem>
                        {coursiers.map((c) => (
                          <SelectItem key={c.id} value={c.nom}>
                            {c.nom}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="mode_commande"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Mode commande</FormLabel>
                    <Select onValueChange={(v) => field.onChange(v === '__none__' ? undefined : v)} value={field.value ?? '__none__'}>
                      <FormControl>
                        <SelectTrigger className="bg-white border-gray-300 text-gray-900">
                          <SelectValue placeholder="— Sélectionner —" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white border-gray-200 text-gray-900">
                        <SelectItem value="__none__">— Sélectionner —</SelectItem>
                        <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                        <SelectItem value="Appel">Appel</SelectItem>
                        <SelectItem value="Instagram">Instagram</SelectItem>
                        <SelectItem value="Sur place">Sur place</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="priorite"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Priorité</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-white border-gray-300 text-gray-900">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white border-gray-200 text-gray-900">
                        <SelectItem value="Normale">Normale</SelectItem>
                        <SelectItem value="Urgente">Urgente</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 border-gray-300 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              >
                Annuler
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className="flex-1 bg-gray-900 text-white hover:bg-gray-800"
              >
                {isPending
                  ? 'Enregistrement...'
                  : isEditing
                  ? 'Enregistrer'
                  : 'Créer la commande'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
