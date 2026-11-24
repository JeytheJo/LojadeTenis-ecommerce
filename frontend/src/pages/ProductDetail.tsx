import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Truck, Package, CreditCard } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { getProduct, registerView } from '../lib/api'
import { formatBRL } from '../lib/whatsapp'
import { useCart } from '../context/CartContext'
import type { Product } from '../types/product'

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const { addItem } = useCart()

  useEffect(() => {
    if (!id) return
    getProduct(id)
      .then((p) => setProduct(p))
      .catch(() => setProduct(null))
      .finally(() => setLoading(false))
    registerView(id)
  }, [id])

  if (loading) {
    return (
      <div className="flex flex-col w-full">
        <Header />
        <p className="font-sans text-steel text-[13px] px-[64px] py-[64px]">Carregando produto...</p>
        <Footer />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="flex flex-col w-full">
        <Header />
        <div className="flex flex-col gap-[16px] px-[64px] py-[64px]">
          <p className="font-sans text-steel text-[13px]">Produto não encontrado.</p>
          <Link to="/" className="font-sans text-navy text-[13px] w-fit">
            Voltar ao catálogo
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  const semEstoque = (product.estoque ?? 0) <= 0

  return (
    <div className="flex flex-col w-full">
      <Header />
      <div className="grid grid-cols-2 gap-[64px] px-[64px] py-[64px] w-full">
        <div className="w-full h-[560px] bg-sand">
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.nome} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-steel text-[13px]">
              Sem imagem
            </div>
          )}
        </div>

        <div className="flex flex-col gap-[24px]">
          <div className="flex flex-col gap-[6px]">
            <p className="font-sans text-navy text-[12px] uppercase tracking-wide">
              {product.marca} · {product.categoria}
            </p>
            <p className="font-display text-ink text-[32px]">{product.nome}</p>
            <p className="font-semibold text-ink text-[22px]">{formatBRL(product.preco)}</p>
          </div>

          <div className="flex flex-col gap-[8px]">
            <p className="font-sans text-ink text-[13px]">
              Cor: <span className="text-steel">{product.cor}</span>
            </p>
            <p className="font-sans text-ink text-[13px]">
              Tamanho: <span className="text-steel">{product.tamanho}</span>
            </p>
            <p className="font-sans text-[13px]">
              {semEstoque ? (
                <span className="text-red-600">Sem estoque no momento</span>
              ) : (
                <span className="text-steel">{product.estoque} em estoque</span>
              )}
            </p>
          </div>

          <button
            disabled={semEstoque}
            onClick={() => addItem(product)}
            className="bg-navy text-offwhite font-sans text-[14px] px-[32px] py-[16px] w-full disabled:opacity-40"
          >
            {semEstoque ? 'Indisponível' : 'Adicionar à sacola'}
          </button>

          {product.description && (
            <p className="font-sans text-steel text-[13px] leading-[1.6]">{product.description}</p>
          )}

          <div className="flex flex-col gap-[14px] border-t border-sand pt-[24px]">
            <div className="flex items-center gap-[10px] text-[13px] font-sans text-ink">
              <Truck className="w-5 h-5 text-navy" /> Frete grátis em compras acima de R$ 299
            </div>
            <div className="flex items-center gap-[10px] text-[13px] font-sans text-ink">
              <Package className="w-5 h-5 text-navy" /> Troca grátis em até 30 dias
            </div>
            <div className="flex items-center gap-[10px] text-[13px] font-sans text-ink">
              <CreditCard className="w-5 h-5 text-navy" /> Em até 3x sem juros no cartão
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}