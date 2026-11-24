import { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'
import { getRecentlyViewed, clearHistory } from '../lib/api'
import { useCart } from '../context/CartContext'
import type { Product } from '../types/product'

export default function RecentlyViewed() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { addItem } = useCart()

  useEffect(() => {
    getRecentlyViewed()
      .then((data) => setProducts(Array.isArray(data) ? data : []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false))
  }, [])

  async function handleClear() {
    await clearHistory()
    setProducts([])
  }

  return (
    <div className="flex flex-col w-full">
      <Header />
      <div className="flex flex-col gap-[32px] px-[64px] py-[64px] w-full">
        <div className="flex items-end justify-between w-full">
          <p className="font-display text-ink text-[28px]">Vistos recentemente</p>
          {products.length > 0 && (
            <button onClick={handleClear} className="font-sans text-[13px] text-navy">
              Limpar histórico
            </button>
          )}
        </div>

        {loading ? (
          <p className="font-sans text-steel text-[13px]">Carregando...</p>
        ) : products.length === 0 ? (
          <p className="font-sans text-steel text-[13px]">
            Você ainda não visualizou nenhum produto.
          </p>
        ) : (
          <div className="grid grid-cols-4 gap-x-[24px] gap-y-[48px] w-full">
            {products.map((p) => (
              <ProductCard key={p._id} product={p} onAdd={addItem} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}