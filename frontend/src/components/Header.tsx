import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, Heart, ShoppingBag, X } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function Header() {
  const { items } = useCart()
  const count = items.reduce((sum, i) => sum + i.quantity, 0)

  const [buscaAberta, setBuscaAberta] = useState(false)
  const [termo, setTermo] = useState('')
  const navigate = useNavigate()

  function handleBuscar(e: React.FormEvent) {
    e.preventDefault()
    const query = termo.trim()
    navigate(query ? `/?busca=${encodeURIComponent(query)}` : '/')
    setBuscaAberta(false)
  }

  return (
    <div className="flex flex-col items-start w-full">
      <div className="bg-navy flex items-center justify-center py-[10px] w-full">
        <p className="text-offwhite text-[11px] font-sans">
          Uma casa com mais significado. Frete grátis em compras acima de R$ 299.
        </p>
      </div>
      <div className="bg-offwhite flex items-center justify-between px-[64px] py-[24px] w-full gap-[24px]">
        <Link to="/">
          <p className="font-display text-ink text-[32px]">Kicks&amp;Co.</p>
        </Link>

        {buscaAberta ? (
          <form onSubmit={handleBuscar} className="flex items-center flex-1 max-w-[420px] gap-[8px]">
            <input
              autoFocus
              type="text"
              placeholder="Buscar por nome ou marca..."
              value={termo}
              onChange={(e) => setTermo(e.target.value)}
              className="border border-sand px-[14px] py-[8px] font-sans text-[13px] w-full bg-offwhite"
            />
            <button type="submit" aria-label="Buscar" className="p-[6px]">
              <Search className="w-5 h-5 text-ink" />
            </button>
            <button
              type="button"
              aria-label="Fechar busca"
              className="p-[6px]"
              onClick={() => {
                setBuscaAberta(false)
                setTermo('')
              }}
            >
              <X className="w-5 h-5 text-steel" />
            </button>
          </form>
        ) : (
          <nav className="flex gap-[28px] font-sans text-ink text-[13px]">
            <Link to="/">Catálogo</Link>
            <Link to="/favoritos">Favoritos</Link>
            <Link to="/vistos-recentemente">Vistos recentemente</Link>
            <Link to="/admin/login">Admin</Link>
          </nav>
        )}

        <div className="flex gap-[24px] items-center shrink-0">
          {!buscaAberta && (
            <button onClick={() => setBuscaAberta(true)} aria-label="Abrir busca">
              <Search className="w-6 h-6 text-ink" />
            </button>
          )}
          <Link to="/favoritos" aria-label="Favoritos">
            <Heart className="w-6 h-6 text-ink" />
          </Link>
          <Link to="/carrinho" className="relative" aria-label="Sacola">
            <ShoppingBag className="w-6 h-6 text-ink" />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-navy text-offwhite text-[10px] rounded-full w-[18px] h-[18px] flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </div>
  )
}