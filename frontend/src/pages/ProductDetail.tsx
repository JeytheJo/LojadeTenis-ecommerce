import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { getProduct, registerView } from '../lib/api'
import { formatBRL } from '../lib/whatsapp'
import type { Product } from '../types/product'
import { useCart } from '../context/CartContext'

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [size, setSize] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { addItem } = useCart()

  useEffect(() => {
    if (!id) return
    getProduct(id)
      .then((p) => {
        setProduct(p)
        setSize(p.sizes?.[0] ?? null)
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))

    // Registra no histórico (Redis) — falha aqui não deve travar a tela
    registerView(id).catch(() => {})
  }, [id])

  if (loading) return <p className="p-16 font-sans text-navy">Carregando...</p>
  if (error || !product)
    return <p className="p-16 font-sans text-red-600">Produto não encontrado. {error}</p>

  return (
    <div className="bg-offwhite flex flex-col items-start w-full min-h-screen">
      <Header />

      <div className="flex flex-col gap-[32px] p-[64px] w-full">
        <Link
          to="/"
          className="bg-offwhite border border-steel flex items-center justify-center p-[16px] w-fit font-medium text-navy text-[13px]"
        >
          ← Voltar ao catálogo
        </Link>

        <div className="flex flex-col md:flex-row gap-[64px] items-start w-full">
          <div className="bg-sand h-[420px] w-full md:w-[500px] flex items-center justify-center overflow-hidden">
            {product.imageUrl ? (
              <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-steel text-[12px]">Sem imagem</span>
            )}
          </div>

          <div className="flex flex-col gap-[24px] w-full md:w-[500px]">
            <p className="font-semibold text-navy text-[10px]">
              CATÁLOGO / {product.category?.toUpperCase()}
            </p>
            <p className="font-display text-ink text-[36px]">{product.name}</p>
            <p className="font-sans text-navy text-[14px]">
              {product.category}
              {product.brand ? ` · ${product.brand}` : ''}
            </p>
            <p className="font-semibold text-ink text-[26px]">{formatBRL(product.price)}</p>
            {product.description && (
              <p className="font-sans text-navy text-[14px]">{product.description}</p>
            )}

            {product.sizes?.length > 0 && (
              <div className="flex flex-col gap-[12px]">
                <p className="text-[13px]">
                  <span className="font-medium text-ink">Tamanho BR: </span>
                  <span className="font-semibold text-navy">{size}</span>
                </p>
                <div className="flex gap-[10px]">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`border p-[16px] font-medium text-[13px] ${
                        s === size ? 'bg-navy text-offwhite border-navy' : 'bg-offwhite text-navy border-steel'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => size !== null && addItem(product, size)}
              className="bg-navy flex items-center justify-center p-[16px] w-full font-medium text-offwhite text-[13px]"
            >
              Adicionar ao carrinho →
            </button>

            <Link
              to="/vistos-recentemente"
              className="bg-offwhite border border-steel flex items-center justify-center p-[16px] font-medium text-navy text-[13px]"
            >
              Ver tênis vistos recentemente
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
