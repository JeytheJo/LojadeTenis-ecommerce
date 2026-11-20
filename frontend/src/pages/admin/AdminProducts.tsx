import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getProducts } from '../../lib/api'
import { formatBRL } from '../../lib/whatsapp'
import type { Product } from '../../types/product'
import { useAuth } from '../../context/AuthContext'

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/admin/login')
      return
    }
    getProducts()
      .then((data) => setProducts(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false))
  }, [user, navigate])

  const categorias = new Set(products.map((p) => p.category)).size

  return (
    <div className="bg-offwhite flex flex-col items-start w-full min-h-screen">
      <div className="bg-navy flex items-center justify-center py-[9px] w-full">
        <p className="text-offwhite text-[10px] font-medium">ÁREA ADMINISTRATIVA · SUPABASE AUTH</p>
      </div>
      <div className="flex items-center justify-between px-[64px] py-[20px] w-full">
        <Link to="/">
          <p className="font-display text-navy text-[32px]">Kicks&amp;Co.</p>
        </Link>
        <p className="font-semibold text-navy text-[11px]">ADMINISTRAÇÃO</p>
        <div className="flex gap-[16px]">
          <Link to="/" className="font-medium text-navy text-[13px]">
            Ver loja
          </Link>
          <button
            onClick={() => {
              logout()
              navigate('/admin/login')
            }}
            className="font-medium text-navy text-[13px]"
          >
            Sair
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-[28px] p-[64px] w-full">
        <div className="flex items-center justify-between w-full">
          <div>
            <p className="font-display text-ink text-[36px]">Produtos</p>
            <p className="font-semibold text-navy text-[10px]">MONGODB · LISTAGEM</p>
          </div>
          <Link
            to="/admin/produtos/novo"
            className="bg-navy flex items-center justify-center p-[16px] font-medium text-offwhite text-[13px]"
          >
            + Novo produto
          </Link>
        </div>

        <div className="flex gap-[24px] flex-wrap">
          <div className="bg-sand flex flex-col gap-[8px] p-[24px] w-[300px]">
            <p className="font-display text-ink text-[26px]">{products.length}</p>
            <p className="font-sans text-navy text-[12px]">Produtos publicados</p>
          </div>
          <div className="bg-sand flex flex-col gap-[8px] p-[24px] w-[300px]">
            <p className="font-display text-ink text-[26px]">{categorias}</p>
            <p className="font-sans text-navy text-[12px]">Categorias</p>
          </div>
        </div>

        {loading && <p className="font-sans text-navy">Carregando...</p>}

        {!loading && (
          <div className="bg-offwhite flex flex-col w-full border border-sand">
            <div className="bg-sand flex gap-[24px] p-[20px] w-full font-semibold text-navy text-[10px]">
              <p className="w-[350px]">PRODUTO</p>
              <p className="w-[120px]">SKU</p>
              <p className="w-[120px]">PREÇO</p>
              <p className="w-[140px]">AÇÃO</p>
            </div>
            {products.map((p) => (
              <div key={p._id} className="border-b border-sand flex gap-[24px] items-center p-[20px] w-full">
                <div className="flex gap-[16px] items-center w-[350px]">
                  <div className="w-[48px] h-[48px] bg-sand flex items-center justify-center overflow-hidden">
                    {p.imageUrl && <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover" />}
                  </div>
                  <p className="font-medium text-ink text-[14px]">{p.name}</p>
                </div>
                <p className="font-sans text-navy text-[12px] w-[120px]">{p.sku}</p>
                <p className="font-medium text-ink text-[13px] w-[120px]">{formatBRL(p.price)}</p>
                <Link
                  to={`/produto/${p._id}`}
                  className="bg-offwhite border border-steel flex items-center justify-center p-[10px] w-[140px] font-medium text-navy text-[13px]"
                >
                  Ver produto
                </Link>
              </div>
            ))}
            {products.length === 0 && (
              <p className="p-[20px] font-sans text-navy text-[13px]">
                Nenhum produto cadastrado ainda.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
