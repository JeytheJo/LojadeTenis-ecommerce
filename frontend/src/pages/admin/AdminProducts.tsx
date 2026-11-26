import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { getProducts, deleteProduct } from '../../lib/api'
import { formatBRL } from '../../lib/whatsapp'
import type { Product } from '../../types/product'

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { signOut } = useAuth()
  const navigate = useNavigate()

  // A sessão já é garantida pelo <ProtectedRoute> em App.tsx.
  // Aqui só buscamos os produtos, sem checar/redirecionar de novo.
  // Isso evita duas checagens de sessão competindo.
  useEffect(() => {
    getProducts()
      .then((data) => setProducts(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false))
  }, [])

  const handleDelete = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja deletar este produto?')) return
    try {
      await deleteProduct(id)
      // Atualiza a lista na tela sem precisar recarregar a página
      setProducts((prev) => prev.filter((p) => p._id !== id))
    } catch {
      alert('Erro ao deletar produto')
    }
  }

  const categorias = new Set(products.map((p) => p.categoria)).size

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
            onClick={async () => {
              await signOut()
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
              <p className="w-[250px]">PRODUTO</p>
              <p className="w-[100px]">MARCA</p>
              <p className="w-[120px]">CATEGORIA</p>
              <p className="w-[80px]">TAMANHO</p>
              <p className="w-[100px]">PREÇO</p>
              <p className="w-[80px]">ESTOQUE</p>
              <p className="w-[140px]">AÇÕES</p>
            </div>
            {products.map((p) => (
              <div key={p._id} className="border-b border-sand flex gap-[24px] items-center p-[20px] w-full">
                <p className="font-medium text-ink text-[14px] w-[250px]">{p.nome}</p>
                <p className="font-sans text-navy text-[12px] w-[100px]">{p.marca}</p>
                <p className="font-sans text-navy text-[12px] w-[120px]">{p.categoria}</p>
                <p className="font-sans text-navy text-[12px] w-[80px]">{p.tamanho}</p>
                <p className="font-medium text-ink text-[13px] w-[100px]">{formatBRL(p.preco)}</p>
                <p className="font-sans text-navy text-[12px] w-[80px]">{p.estoque}</p>
                <div className="flex gap-[16px] w-[140px] text-[13px]">
                  <Link to={`/admin/produtos/editar/${p._id}`} className="text-navy underline">
                    Editar
                  </Link>
                  <button onClick={() => handleDelete(p._id)} className="text-red-600 underline">
                    Deletar
                  </button>
                </div>
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