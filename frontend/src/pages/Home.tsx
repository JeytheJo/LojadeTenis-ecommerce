import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Truck, Package, CreditCard, ArrowRight, ArrowUpRight } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'
import { getProducts } from '../lib/api'
import type { Product } from '../types/product'
import { useCart } from '../context/CartContext'

const CATEGORIAS_FIGMA = [
  { nome: 'Sneakers', imagem: '/categorias/sneakers.png' },
  { nome: 'Casual', imagem: '/categorias/casual.png' },
  { nome: 'Sport', imagem: '/categorias/sport.png' },
  { nome: 'Sociais', imagem: '/categorias/sociais.png' },
] as const

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { addItem } = useCart()
  const [searchParams] = useSearchParams()
  const categoriaFiltro = searchParams.get('categoria')

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(Array.isArray(data) ? data : []))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  const produtosFiltrados = categoriaFiltro
    ? products.filter((p) => p.category?.toLowerCase() === categoriaFiltro.toLowerCase())
    : products

  return (
    <div className="bg-offwhite flex flex-col items-start w-full min-h-screen">
      <Header />

      {/* Hero */}
      <div className="bg-sand flex items-center w-full h-[560px]">
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
        {/* Camada do Figma: "campanha_nova_coleção_de_tênis" (Hero), 780 × 560, exportada em 2x → public/campanha-home.png */}
        <img
          src="/campanha-home.png"
          alt="Nova coleção Kicks&Co."
          className="w-[780px] h-[560px] object-cover hidden md:block"
        />
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
      <div className="flex flex-col gap-[32px] pb-[48px] pt-[56px] px-[64px] w-full">
        <div className="flex items-center justify-between w-full">
          <p className="font-display text-ink text-[34px]">Encontre o seu essencial</p>
          <p className="font-sans text-navy text-[13px]">Explore por categoria</p>
        </div>
        <div className="flex gap-[24px] flex-wrap">
          {CATEGORIAS_FIGMA.map((cat) => (
            <Link
              key={cat.nome}
              to={`/?categoria=${encodeURIComponent(cat.nome)}`}
              className="flex flex-col gap-[12px] w-[310px]"
            >
              <img
                src={cat.imagem}
                alt={cat.nome}
                className="w-[310px] h-[205px]"
              />
              <div className="flex items-center justify-between w-[310px]">
                <p className="font-sans text-ink text-[16px]">{cat.nome}</p>
                <ArrowUpRight className="w-5 h-5 text-navy" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Catálogo / Mais vendidos */}
      <div className="flex flex-col gap-[32px] pb-[64px] pt-[40px] px-[64px] w-full">
        <div className="flex items-center justify-between w-full">
          <p className="font-display text-ink text-[30px]">
            {categoriaFiltro ? `Categoria: ${categoriaFiltro}` : 'Catálogo de tênis'}
          </p>
          {categoriaFiltro && (
            <Link to="/" className="font-sans text-navy text-[13px] underline">
              Ver todos os produtos
            </Link>
          )}
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
        {!loading && !error && products.length > 0 && produtosFiltrados.length === 0 && (
          <p className="font-sans text-navy">
            Nenhum produto cadastrado com a categoria "{categoriaFiltro}" ainda.
          </p>
        )}

        <div className="flex flex-wrap gap-[24px]">
          {produtosFiltrados.map((product) => (
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