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
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center px-4">
      <div className="mb-8 text-center">
        <h1 className="text-white font-serif tracking-widest text-3xl font-bold uppercase">
          STEFCOS
        </h1>
        <p className="text-gray-400 text-sm mt-2 tracking-wider uppercase">
          Espace Administration
        </p>
      </div>

      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-xl p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm text-gray-300" htmlFor="email">
              Adresse email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@stefcos.com"
              required
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-gray-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-300" htmlFor="password">
              Mot de passe
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-gray-500"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm bg-red-950/40 border border-red-900 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <Button
            type="submit"
            disabled={submitting}
            className="w-full bg-white text-black hover:bg-gray-100 font-medium"
          >
            {submitting ? 'Connexion...' : 'Accéder'}
          </Button>
        </form>
      </div>
    </div>
  )
}
