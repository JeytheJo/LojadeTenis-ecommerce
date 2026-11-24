import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, ShoppingBag, Truck, RefreshCw, CreditCard } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { getProduct, registerView } from '../lib/api'
import { useCart } from '../context/CartContext'
import type { Product } from '../types/product'

function formatBRL(value: unknown): string {
  if (typeof value !== 'number' || isNaN(value)) return 'R$ --'
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { addItem } = useCart()

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [adicionado, setAdicionado] = useState(false)

  useEffect(() => {
    if (!id) return
    getProduct(id)
      .then((data) => setProduct(data))
      .catch(() => setProduct(null))
      .finally(() => setLoading(false))

    // Registra no histórico do Redis (silencioso se backend ainda não tiver a rota)
    registerView(id)
  }, [id])

  function handleAddToCart() {
    if (!product) return
    addItem(product)
    setAdicionado(true)
    setTimeout(() => setAdicionado(false), 2000)
  }

  if (loading) {
    return (
      <div className="flex flex-col w-full">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="font-sans text-steel text-[13px]">Carregando produto...</p>
        </div>
        <Footer />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="flex flex-col w-full">
        <Header />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-[16px]">
          <p className="font-sans text-steel text-[13px]">Produto não encontrado.</p>
          <button
            onClick={() => navigate('/')}
            className="font-sans text-[13px] text-navy underline"
          >
            Voltar ao catálogo
          </button>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col w-full">
      <Header />

      <div className="flex flex-col px-[64px] py-[48px] gap-[48px] w-full max-w-[1280px] mx-auto">
        {/* Breadcrumb */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-[8px] font-sans text-[13px] text-steel hover:text-ink transition-colors w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </button>

        {/* Produto */}
        <div className="grid grid-cols-2 gap-[64px] items-start">
          {/* Imagem */}
          <div className="w-full aspect-square bg-lightgray overflow-hidden">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.nome}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-steel font-sans text-[13px]">
                sem imagem
              </div>
            )}
          </div>

          {/* Infos */}
          <div className="flex flex-col gap-[24px]">
            <div className="flex flex-col gap-[4px]">
              <p className="font-sans text-steel text-[11px] uppercase tracking-wider">
                {product.marca} · {product.categoria}
              </p>
              <h1 className="font-display text-ink text-[36px] leading-[1.1]">{product.nome}</h1>
              <p className="font-display text-ink text-[28px]">{formatBRL(product.preco)}</p>
            </div>

            <div className="flex flex-col gap-[8px]">
              <p className="font-sans text-[13px] text-ink">
                Cor: <span className="text-navy">{product.cor}</span>
              </p>
              <p className="font-sans text-[13px] text-ink">
                Tamanho: <span className="text-navy">{product.tamanho}</span>
              </p>
              {product.estoque > 0 ? (
                <p className="font-sans text-[13px] text-navy">{product.estoque} em estoque</p>
              ) : (
                <p className="font-sans text-[13px] text-red-500">Fora de estoque</p>
              )}
            </div>

            {product.description && (
              <p className="font-sans text-[13px] text-steel leading-relaxed">
                {product.description}
              </p>
            )}

            {/* Botão principal */}
            <button
              onClick={handleAddToCart}
              disabled={product.estoque === 0}
              className={`flex items-center justify-center gap-[8px] w-full py-[16px] font-sans text-[14px] transition-colors ${
                product.estoque === 0
                  ? 'bg-lightgray text-steel cursor-not-allowed'
                  : adicionado
                  ? 'bg-green-700 text-offwhite'
                  : 'bg-navy text-offwhite hover:bg-ink'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              {adicionado ? 'Adicionado à sacola!' : 'Adicionar à sacola'}
            </button>

            {/* Benefícios */}
            <div className="flex flex-col gap-[12px] pt-[8px] border-t border-lightgray">
              <div className="flex items-center gap-[10px]">
                <Truck className="w-4 h-4 text-steel shrink-0" />
                <p className="font-sans text-[12px] text-steel">Frete grátis em compras acima de R$ 299</p>
              </div>
              <div className="flex items-center gap-[10px]">
                <RefreshCw className="w-4 h-4 text-steel shrink-0" />
                <p className="font-sans text-[12px] text-steel">Troca grátis em até 30 dias</p>
              </div>
              <div className="flex items-center gap-[10px]">
                <CreditCard className="w-4 h-4 text-steel shrink-0" />
                <p className="font-sans text-[12px] text-steel">Em até 3x sem juros no cartão</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}