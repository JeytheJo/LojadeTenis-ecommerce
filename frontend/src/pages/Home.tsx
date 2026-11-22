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
            Design que acolhe, materiais que duram. Encontre o que faz a seu estilo ser você.
          </p>
          <Link to="/" className="bg-navy flex gap-[24px] items-center p-[16px] w-fit">
            <p className="font-medium text-offwhite text-[14px]">Explorar coleção</p>
            <ArrowRight className="w-5 h-5 text-offwhite" />
          </Link>
        </div>
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

      {/* Catálogo / "Os favoritos da casa" */}
      <div className="flex flex-col gap-[32px] pb-[64px] pt-[40px] px-[64px] w-full">
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col gap-[6px]">
            <p className="font-display text-ink text-[36px]">
              {categoriaFiltro ? `Categoria: ${categoriaFiltro}` : 'Os favoritos da casa'}
            </p>
            {!categoriaFiltro && (
              <p className="font-sans text-navy text-[14px]">Peças que conquistam, todos os dias.</p>
            )}
          </div>
          {categoriaFiltro ? (
            <Link to="/" className="flex items-center gap-[10px]">
              <p className="font-sans text-ink text-[12px]">Ver todos os produtos</p>
              <ArrowUpRight className="w-5 h-5 text-navy" />
            </Link>
          ) : (
            <div className="flex items-center gap-[10px]">
              <p className="font-sans text-ink text-[12px]">Ver todos os produtos</p>
              <ArrowUpRight className="w-5 h-5 text-navy" />
            </div>
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

      {/* coleção Editorial */}
      <div className="px-[64px] pt-[8px] pb-[64px] w-full">
        <div className="bg-navy flex w-full">
          {/* camada do Figma: "Editorial · Tênis no dia a dia", exportada 2x → public/editorial.png */}
          <img
            src="/editorial.png"
            alt="Editorial Kicks&Co."
            className="w-[656px] h-[384px] object-cover hidden md:block"
          />
          <div className="w-[656px] p-[48px] flex flex-col gap-[20px]">
            <p className="font-semibold text-offwhite text-[10px]">A ESSÊNCIA Kicks&Co.</p>
            <div className="font-display text-offwhite text-[48px] leading-[49.56px]">
              <p>Menos excesso.</p>
              <p>Mais significado.</p>
            </div>
            <p className="font-sans text-offwhite text-[16px] max-w-[500px]">
              Acreditamos em um estilo que conta histórias. Por isso, reunimos peças com design
              atemporal, materiais naturais e cuidado em cada detalhe.
            </p>
            <Link to="/" className="flex items-center gap-[16px] py-[8px]">
              <p className="font-medium text-offwhite text-[12px]">Conheça nossa história</p>
              <ArrowUpRight className="w-5 h-5 text-offwhite" />
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}