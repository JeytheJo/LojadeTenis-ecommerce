import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'
import { getProducts } from '../lib/api'
import { useCart } from '../context/CartContext'
import type { Product } from '../types/product'

const CATEGORIAS_FIGMA = [
  { label: 'Sneakers', valor: 'sneakers', imagem: '/categorias/sneakers.png' },
  { label: 'Casual',   valor: 'casual',   imagem: '/categorias/casual.png'   },
  { label: 'Sport',    valor: 'sport',    imagem: '/categorias/sport.png'    },
  { label: 'Sociais',  valor: 'sociais',  imagem: '/categorias/sociais.png'  },
]

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams()
  const { addItem } = useCart()

  // Parallax vertical: a imagem se move a 40% da velocidade do scroll,
  // criando profundidade sem sair do container (overflow-hidden).
  const heroRef = useRef<HTMLElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    function onScroll() {
      if (!heroRef.current || !imgRef.current) return
      const rect = heroRef.current.getBoundingClientRect()
      // só anima enquanto a seção estiver visível
      if (rect.bottom < 0 || rect.top > window.innerHeight) return
      const progress = -rect.top // pixels que já saíram pelo topo
      imgRef.current.style.transform = `translateY(${progress * 0.4}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const categoriaFiltro = searchParams.get('categoria')

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(Array.isArray(data) ? data : []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false))
  }, [])

  const produtosFiltrados = categoriaFiltro
    ? products.filter((p) => p.categoria === categoriaFiltro)
    : products

  return (
    <div className="flex flex-col w-full">
      <Header />

      {/* Hero / campanha — parallax vertical */}
      <section ref={heroRef} className="relative w-full h-[560px] bg-navy overflow-hidden">
        <img
          ref={imgRef}
          src="/campanha-home.png"
          alt="Campanha nova coleção de tênis"
          className="w-full h-[140%] object-cover opacity-80 will-change-transform"
          style={{ transform: 'translateY(0px)', top: '-20%' }}
        />
        <div className="absolute inset-0 flex flex-col justify-end gap-[16px] px-[64px] pb-[64px]">
          <p className="font-display text-offwhite text-[48px] leading-[1.1] max-w-[560px]">
            Nova coleção de tênis
          </p>
          <p className="font-sans text-offwhite text-[14px] max-w-[460px]">
            Peças selecionadas para compor um guarda-roupa com propósito, da trilha à cidade.
          </p>
          <a
            href="#catalogo"
            className="flex items-center gap-[8px] bg-offwhite text-ink font-sans text-[13px] px-[24px] py-[12px] w-fit"
          >
            Ver coleção <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Categorias */}
      <section className="flex flex-col gap-[32px] px-[64px] py-[64px] w-full">
        <p className="font-display text-ink text-[28px]">Compre por categoria</p>
        <div className="grid grid-cols-4 gap-[24px] w-full">
          {CATEGORIAS_FIGMA.map((cat) => {
            const ativo = categoriaFiltro === cat.valor
            return (
              <button
                key={cat.valor}
                onClick={() => setSearchParams(ativo ? {} : { categoria: cat.valor })}
                className={`relative h-[220px] overflow-hidden text-left ${ativo ? 'ring-2 ring-navy' : ''}`}
              >
                <img src={cat.imagem} alt={cat.label} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-ink/20 flex items-end p-[16px]">
                  <p className="font-display text-offwhite text-[18px]">{cat.label}</p>
                </div>
              </button>
            )
          })}
        </div>
      </section>

      {/* Catálogo */}
      <section id="catalogo" className="flex flex-col gap-[32px] px-[64px] py-[64px] w-full bg-offwhite">
        <div className="flex items-end justify-between w-full">
          <p className="font-display text-ink text-[28px]">Os favoritos da casa</p>
          {categoriaFiltro && (
            <button onClick={() => setSearchParams({})} className="font-sans text-[13px] text-navy">
              Limpar filtro
            </button>
          )}
        </div>
        {loading ? (
          <p className="font-sans text-steel text-[13px]">Carregando produtos...</p>
        ) : produtosFiltrados.length === 0 ? (
          <p className="font-sans text-steel text-[13px]">Nenhum produto encontrado.</p>
        ) : (
          <div className="grid grid-cols-4 gap-x-[24px] gap-y-[48px] w-full">
            {produtosFiltrados.map((p) => (
              <ProductCard key={p._id} product={p} onAdd={addItem} />
            ))}
          </div>
        )}
      </section>

      {/* Coleção Editorial */}
      <section className="relative w-full h-[420px] overflow-hidden">
        <img src="/editorial.png" alt="Coleção editorial" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-ink/30 flex flex-col justify-center gap-[12px] px-[64px]">
          <p className="font-display text-offwhite text-[32px] max-w-[480px]">
            Uma coleção editorial, peça por peça
          </p>
          <a href="#catalogo" className="flex items-center gap-[6px] text-offwhite font-sans text-[13px] w-fit">
            Explorar <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}