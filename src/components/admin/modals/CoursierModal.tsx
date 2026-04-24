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
import { Button } from '@/components/ui/button'
import type { Coursier } from '@/hooks/useCoursiers'
import { useCreateCoursier, useUpdateCoursier } from '@/hooks/useCoursiers'

const schema = z.object({
  nom: z.string().min(1, 'Nom requis'),
  telephone: z.string().optional(),
  zone: z.string().optional(),
  disponibilite: z.enum(['Disponible', 'En livraison', 'Hors service']),
})

type FormValues = z.infer<typeof schema>

interface CoursierModalProps {
  open: boolean
  onClose: () => void
  coursier?: Coursier
}

export default function CoursierModal({ open, onClose, coursier }: CoursierModalProps) {
  const createCoursier = useCreateCoursier()
  const updateCoursier = useUpdateCoursier()
  const isEditing = !!coursier

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      nom: '',
      telephone: '',
      zone: '',
      disponibilite: 'Disponible',
    },
  })

  useEffect(() => {
    if (coursier) {
      form.reset({
        nom: coursier.nom,
        telephone: coursier.telephone ?? '',
        zone: coursier.zone ?? '',
        disponibilite: coursier.disponibilite,
      })
    } else {
      form.reset({
        nom: '',
        telephone: '',
        zone: '',
        disponibilite: 'Disponible',
      })
    }
  }, [coursier, open, form])

  const onSubmit = async (values: FormValues) => {
    const payload = {
      nom: values.nom,
      telephone: values.telephone || null,
      zone: values.zone || null,
      disponibilite: values.disponibilite,
    }
    if (isEditing && coursier) {
      await updateCoursier.mutateAsync({ id: coursier.id, ...payload })
    } else {
      await createCoursier.mutateAsync(payload)
    }
    onClose()
  }

  const isPending = createCoursier.isPending || updateCoursier.isPending

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="bg-gray-900 border border-gray-800 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white">
            {isEditing ? 'Modifier le coursier' : 'Ajouter un coursier'}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-2">
            <FormField
              control={form.control}
              name="nom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Nom *</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
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
                  <FormLabel className="text-gray-300">Téléphone</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="zone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Zone</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="disponibilite"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Disponibilité</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-gray-800 border-gray-700 text-white">
                      <SelectItem value="Disponible">Disponible</SelectItem>
                      <SelectItem value="En livraison">En livraison</SelectItem>
                      <SelectItem value="Hors service">Hors service</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                Annuler
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className="flex-1 bg-white text-black hover:bg-gray-100"
              >
                {isPending ? 'Enregistrement...' : isEditing ? 'Modifier' : 'Ajouter'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
