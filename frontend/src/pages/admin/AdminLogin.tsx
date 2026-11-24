import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'


export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const { signIn } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      const { error: signInError } = await signIn(email, password)
      if (signInError) {
        setError(signInError)
        return
      }
      navigate('/admin/produtos')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-offwhite px-[24px]">
      <div className="flex flex-col gap-[24px] w-full max-w-[380px]">
        <p className="font-display text-ink text-[32px] text-center">Kicks&amp;Co.</p>
        <p className="font-sans text-steel text-[13px] text-center">Painel administrativo</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-[16px]">
          <input
            type="email"
            required
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-sand px-[16px] py-[12px] font-sans text-[14px] bg-offwhite"
          />
          <input
            type="password"
            required
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-sand px-[16px] py-[12px] font-sans text-[14px] bg-offwhite"
          />
          {error && <p className="font-sans text-[12px] text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="bg-navy text-offwhite font-sans text-[14px] px-[24px] py-[14px] disabled:opacity-50"
          >
            {submitting ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}