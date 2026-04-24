import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAdminAuth } from '@/hooks/useAdminAuth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function AdminLoginPage() {
  const navigate = useNavigate()
  const { user, loading, signIn } = useAdminAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!loading && user) {
      navigate('/admin/dashboard', { replace: true })
    }
  }, [user, loading, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    const result = await signIn(email, password)
    setSubmitting(false)
    if (result.error) {
      setError(result.error)
    } else {
      navigate('/admin/dashboard', { replace: true })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="mb-8 text-center">
        <h1 className="text-gray-900 font-serif tracking-widest text-3xl font-bold uppercase">
          STEFCOS
        </h1>
        <p className="text-gray-500 text-sm mt-2 tracking-wider uppercase">
          Espace Administration
        </p>
      </div>

      <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm text-gray-700" htmlFor="email">
              Adresse email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@stefcos.com"
              required
              className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-gray-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-700" htmlFor="password">
              Mot de passe
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-gray-500"
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <Button
            type="submit"
            disabled={submitting}
            className="w-full bg-gray-900 text-white hover:bg-gray-800 font-medium"
          >
            {submitting ? 'Connexion...' : 'Accéder'}
          </Button>
        </form>
      </div>
    </div>
  )
}
