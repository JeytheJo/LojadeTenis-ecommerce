import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'
import { getRecentlyViewed, clearHistory } from '../lib/api'
import type { Product } from '../types/product'
import { useCart } from '../context/CartContext'

export default function RecentlyViewed() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { addItem } = useCart()

  const load = () => {
    setLoading(true)
    getRecentlyViewed()
      .then(setProducts)
      .finally(() => setLoading(false))
  }

  useEffect(load, [])

  const ultimo = products[0]

  return (
    <div className="bg-offwhite flex flex-col items-start w-full min-h-screen">
      <Header />

      <div className="flex flex-col gap-[24px] p-[64px] w-full">
        <p className="font-display text-ink text-[36px]">Vistos recentemente</p>
        <p className="font-semibold text-navy text-[10px]">HISTÓRICO / REDIS</p>
        <p className="font-sans text-navy text-[14px]">
          Os tênis que você abriu aparecem aqui.
        </p>

        <div className="bg-steel flex flex-col gap-[4px] p-[20px] w-full">
          <p className="font-sans text-ink text-[11px]">Último tênis aberto</p>
          <p className="font-medium text-ink text-[18px]">
            {ultimo ? ultimo.name : 'Nenhum tênis visto ainda'}
          </p>
        </div>

        {loading && <p className="font-sans text-navy">Carregando...</p>}

        {!loading && products.length === 0 && (
          <div className="flex flex-col gap-[16px]">
            <p className="font-display text-ink text-[26px]">Seu próximo favorito está por aí.</p>
            <Link to="/" className="bg-navy flex items-center justify-center p-[16px] w-fit font-medium text-offwhite text-[13px]">
              Explorar catálogo
            </Link>
          </div>
        )}

        {products.length > 0 && (
          <div className="flex flex-wrap gap-[24px]">
            {products.map((p) => (
              <ProductCard key={p._id} product={p} onAdd={(prod) => addItem(prod, prod.sizes?.[0] ?? 0)} />
            ))}
          </div>
        )}

        <div className="flex gap-[16px]">
          <button
            onClick={() => clearHistory().then(load)}
            className="bg-offwhite border border-steel flex items-center justify-center p-[16px] font-medium text-navy text-[13px]"
          >
            Limpar histórico
          </button>
          <Link
            to="/"
            className="bg-offwhite border border-steel flex items-center justify-center p-[16px] font-medium text-navy text-[13px]"
          >
            Continuar comprando
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  )
}
