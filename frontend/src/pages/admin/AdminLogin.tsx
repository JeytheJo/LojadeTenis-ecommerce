import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await login(email, password)
      navigate('/admin/produtos')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'E-mail ou senha inválidos.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-offwhite flex flex-col items-start w-full min-h-screen">
      <div className="bg-navy flex items-center justify-center py-[9px] w-full">
        <p className="text-offwhite text-[10px] font-medium">ÁREA ADMINISTRATIVA · SUPABASE AUTH</p>
      </div>
      <div className="flex items-center justify-between px-[64px] py-[20px] w-full">
        <Link to="/">
          <p className="font-display text-navy text-[32px]">Kicks&amp;Co.</p>
        </Link>
        <p className="font-semibold text-navy text-[11px]">ADMINISTRAÇÃO</p>
        <Link to="/" className="font-medium text-navy text-[13px]">
          Ver loja
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-[64px] p-[64px] w-full">
        <div className="bg-sand flex flex-col gap-[24px] p-[40px] w-full md:w-[500px]">
          <p className="font-semibold text-navy text-[11px]">KICKS&amp;CO. / ADMIN</p>
          <p className="font-display text-ink text-[36px]">Sua coleção, no seu controle.</p>
          <p className="font-sans text-navy text-[16px]">
            Gerencie o catálogo de tênis e prepare os próximos lançamentos da loja.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-offwhite flex flex-col gap-[24px] p-[40px] w-full md:w-[500px]"
        >
          <p className="font-display text-ink text-[30px]">Bem-vindo de volta</p>

          <div className="flex flex-col gap-[8px] w-full">
            <label className="font-medium text-ink text-[13px]">E-mail</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@kicksco.com"
              className="bg-offwhite border border-steel p-[16px] text-[14px] text-navy"
            />
          </div>

          <div className="flex flex-col gap-[8px] w-full">
            <label className="font-medium text-ink text-[13px]">Senha</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="bg-offwhite border border-steel p-[16px] text-[14px] text-navy"
            />
          </div>

          {error && <p className="text-red-600 text-[13px]">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-navy flex items-center justify-center p-[16px] w-full font-medium text-offwhite text-[13px] disabled:opacity-60"
          >
            {loading ? 'Entrando...' : 'Entrar →'}
          </button>
        </form>
      </div>
    </div>
  )
}
