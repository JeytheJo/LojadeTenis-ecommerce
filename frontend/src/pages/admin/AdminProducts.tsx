import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { getProducts, deleteProduct } from '../../lib/api'
import { formatBRL } from '../../lib/whatsapp'
import type { Product } from '../../types/product'

export default function AdminProducts() {
  const { session, loading: authLoading, signOut } = useAuth()
  const navigate = useNavigate()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (authLoading) return
    if (!session) {
      navigate('/admin/login')
      return
    }
    getProducts()
      .then((data) => setProducts(Array.isArray(data) ? data : []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false))
  }, [session, authLoading, navigate])

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

  if (authLoading || !session) return <div className="p-[64px] font-sans text-steel text-[13px]">Carregando...</div>

  return (
    <div className="flex flex-col w-full px-[64px] py-[48px] gap-[32px]">
      <div className="flex items-center justify-between w-full">
        <div>
          <p className="font-display text-ink text-[28px]">Produtos cadastrados</p>
        </div>
        <div className="flex gap-[16px]">
          <Link to="/admin/produtos/novo" className="bg-navy text-offwhite font-sans text-[13px] px-[20px] py-[12px]">
            + Novo produto
          </Link>
          <button onClick={() => signOut()} className="font-sans text-[13px] text-steel">Sair</button>
        </div>
      </div>

      {loading ? (
        <p className="font-sans text-steel text-[13px]">Carregando produtos...</p>
      ) : (
        <table className="w-full font-sans text-[13px] text-ink">
          <thead>
            <tr className="text-left text-steel border-b border-sand">
              <th className="py-[8px]">Nome</th>
              <th>Marca</th>
              <th>Categoria</th>
              <th>Tamanho</th>
              <th>Preço</th>
              <th>Estoque</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="border-b border-sand">
                <td className="py-[10px]">{p.nome}</td>
                <td>{p.marca}</td>
                <td>{p.categoria}</td>
                <td>{p.tamanho}</td>
                <td>{formatBRL(p.preco)}</td>
                <td>{p.estoque}</td>
                <td className="flex gap-4 py-2">
                  <Link to={`/admin/produtos/editar/${p._id}`} className="text-navy underline">Editar</Link>
                  <button onClick={() => handleDelete(p._id)} className="text-red-600 underline">Deletar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}