import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Truck, Package, CreditCard, ArrowRight } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'
import { getProducts } from '../lib/api'
import type { Product } from '../types/product'
import { useCart } from '../context/CartContext'

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { addItem } = useCart()

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(Array.isArray(data) ? data : []))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  const categorias = Array.from(new Set(products.map((p) => p.category))).slice(0, 4)

  return (
    <div className="bg-offwhite flex flex-col items-start w-full min-h-screen">
      <Header />

      {/* Hero */}
      <div className="bg-sand flex items-center w-full min-h-[400px]">
        <div className="flex flex-col gap-[24px] p-[64px] max-w-[660px]">
          <p className="font-semibold text-navy text-[11px]">NOVA COLEÇÃO / ESSENCIAL</p>
          <div className="font-display text-ink text-[48px] leading-[1.13]">
            <p>Seu espaço.</p>
            <p>Seu jeito de viver.</p>
          </div>
          <p className="font-sans text-navy text-[16px]">
            Design que acolhe, materiais que duram. Encontre o que faz a sua casa ser você.
          </p>
          <Link to="/" className="bg-navy flex gap-[24px] items-center p-[16px] w-fit">
            <p className="font-medium text-offwhite text-[14px]">Explorar coleção</p>
            <ArrowRight className="w-5 h-5 text-offwhite" />
          </Link>
        </div>
        {/* HERO_IMG: exporte o frame "campanha_nova_coleção_de_tênis" do Figma e troque este bloco */}
        <div className="flex-1 h-[400px] bg-steel/30 hidden md:block" />
      </div>

      {/* Benefícios */}
      <div className="flex flex-wrap h-auto items-center justify-between px-[64px] py-[30px] w-full gap-6">
        <div className="flex gap-[14px] items-center">
          <Truck className="w-6 h-6 text-ink" />
          <div>
            <p className="font-medium text-ink text-[13px]">Entrega para todo o Brasil</p>
            <p className="font-sans text-navy text-[11px]">Frete grátis acima de R$ 299</p>
          </div>
        </div>
        <div className="flex gap-[14px] items-center">
          <Package className="w-6 h-6 text-ink" />
          <div>
            <p className="font-medium text-ink text-[13px]">Sua compra, sem pressa</p>
            <p className="font-sans text-navy text-[11px]">Troca fácil em até 30 dias</p>
          </div>
        </div>
        <div className="flex gap-[14px] items-center">
          <CreditCard className="w-6 h-6 text-ink" />
          <div>
            <p className="font-medium text-ink text-[13px]">Do seu jeito</p>
            <p className="font-sans text-navy text-[11px]">Até 6x sem juros no cartão</p>
          </div>
        </div>
      </div>

      {/* Categorias */}
      {categorias.length > 0 && (
        <div className="flex flex-col gap-[32px] pb-[48px] pt-[56px] px-[64px] w-full">
          <p className="font-display text-ink text-[30px]">Encontre o seu essencial</p>
          <div className="flex gap-[24px] flex-wrap">
            {categorias.map((cat) => (
              <div key={cat} className="flex flex-col gap-[12px] w-[200px]">
                <div className="h-[140px] w-full bg-sand" />
                <p className="font-sans text-ink text-[16px]">{cat}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Catálogo / Mais vendidos */}
      <div className="flex flex-col gap-[32px] pb-[64px] pt-[40px] px-[64px] w-full">
        <div className="flex items-center justify-between w-full">
          <p className="font-display text-ink text-[30px]">Catálogo de tênis</p>
        </div>

        {loading && <p className="font-sans text-navy">Carregando produtos...</p>}
        {error && <p className="font-sans text-red-600">Erro ao carregar produtos: {error}</p>}
        {!loading && !error && products.length === 0 && (
          <p className="font-sans text-navy">
            Nenhum produto cadastrado ainda. Acesse a{' '}
            <Link to="/admin/login" className="underline">
              área administrativa
            </Link>{' '}
            para cadastrar o primeiro.
          </p>
        )}

        <div className="flex flex-wrap gap-[24px]">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onAdd={(p) => addItem(p, p.sizes?.[0] ?? 0)}
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}
