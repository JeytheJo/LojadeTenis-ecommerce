import { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'
import { getProducts } from '../lib/api'
import { useCart } from '../context/CartContext'
import { useFavorites } from '../context/FavoritesContext'
import type { Product } from '../types/product'

export default function Favorites() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { addItem } = useCart()
  const { favoriteIds } = useFavorites()

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(Array.isArray(data) ? data : []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false))
  }, [])

  const favoritos = products.filter((p) => favoriteIds.includes(p._id))

  return (
    <div className="flex flex-col w-full">
      <Header />
      <div className="flex flex-col gap-[32px] px-[64px] py-[64px] w-full">
        <p className="font-display text-ink text-[28px]">Meus favoritos</p>

        {loading ? (
          <p className="font-sans text-steel text-[13px]">Carregando...</p>
        ) : favoritos.length === 0 ? (
          <p className="font-sans text-steel text-[13px]">
            Você ainda não favoritou nenhum produto. Clique no coração em um produto para salvá-lo aqui.
          </p>
        ) : (
          <div className="grid grid-cols-4 gap-x-[24px] gap-y-[48px] w-full">
            {favoritos.map((p) => (
              <ProductCard key={p._id} product={p} onAdd={addItem} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}