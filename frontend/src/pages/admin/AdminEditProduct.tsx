import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { getProduct, updateProduct } from '../../lib/api'

const CATEGORIAS = ['sneakers', 'casual', 'sport', 'sociais']

export default function AdminEditProduct() {
  const { id } = useParams<{ id: string }>()
  const { session, loading: authLoading } = useAuth()
  const navigate = useNavigate()

  const [nome, setNome] = useState('')
  const [marca, setMarca] = useState('')
  const [categoria, setCategoria] = useState(CATEGORIAS[0])
  const [cor, setCor] = useState('')
  const [tamanho, setTamanho] = useState('')
  const [preco, setPreco] = useState('')
  const [estoque, setEstoque] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [description, setDescription] = useState('')
  
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loadingData, setLoadingData] = useState(true)

  useEffect(() => {
    if (authLoading) return
    if (!session) navigate('/admin/login')
  }, [session, authLoading, navigate])

  useEffect(() => {
    if (!id) return
    getProduct(id)
      .then((p) => {
        setNome(p.nome)
        setMarca(p.marca)
        setCategoria(p.categoria)
        setCor(p.cor)
        setTamanho(String(p.tamanho))
        setPreco(String(p.preco))
        setEstoque(String(p.estoque))
        setImageUrl(p.imageUrl || '')
        setDescription(p.description || '')
      })
      .catch(() => setError('Erro ao carregar produto'))
      .finally(() => setLoadingData(false))
  }, [id])

  if (authLoading || !session) return null
  if (loadingData) return <div className="p-[64px] font-sans">Carregando dados do produto...</div>

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!id) return
    setError(null)
    setSubmitting(true)
    try {
      await updateProduct(id, {
        nome,
        marca,
        categoria,
        cor,
        tamanho: Number(tamanho),
        preco: Number(preco),
        estoque: Number(estoque),
        imageUrl: imageUrl || undefined,
        description: description || undefined,
      })
      navigate('/admin/produtos')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar produto')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col w-full px-[64px] py-[48px] max-w-[560px] gap-[24px]">
      <div className="flex justify-between items-center">
        <p className="font-display text-ink text-[28px]">Editar produto</p>
        <Link to="/admin/produtos" className="font-sans text-[13px] text-navy">Voltar</Link>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-[16px]">
        <input required placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} className="border border-sand px-[16px] py-[12px] font-sans text-[14px]" />
        <input required placeholder="Marca" value={marca} onChange={(e) => setMarca(e.target.value)} className="border border-sand px-[16px] py-[12px] font-sans text-[14px]" />
        <select value={categoria} onChange={(e) => setCategoria(e.target.value)} className="border border-sand px-[16px] py-[12px] font-sans text-[14px]">
          {CATEGORIAS.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <input required placeholder="Cor" value={cor} onChange={(e) => setCor(e.target.value)} className="border border-sand px-[16px] py-[12px] font-sans text-[14px]" />
        <input required type="number" placeholder="Tamanho" value={tamanho} onChange={(e) => setTamanho(e.target.value)} className="border border-sand px-[16px] py-[12px] font-sans text-[14px]" />
        <input required type="number" step="0.01" placeholder="Preço" value={preco} onChange={(e) => setPreco(e.target.value)} className="border border-sand px-[16px] py-[12px] font-sans text-[14px]" />
        <input required type="number" placeholder="Estoque" value={estoque} onChange={(e) => setEstoque(e.target.value)} className="border border-sand px-[16px] py-[12px] font-sans text-[14px]" />
        <input placeholder="URL da imagem" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="border border-sand px-[16px] py-[12px] font-sans text-[14px]" />
        <textarea placeholder="Descrição" value={description} onChange={(e) => setDescription(e.target.value)} className="border border-sand px-[16px] py-[12px] font-sans text-[14px]" rows={3} />

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button type="submit" disabled={submitting} className="bg-navy text-offwhite font-sans text-[14px] px-[24px] py-[14px] disabled:opacity-50">
          {submitting ? 'Salvando...' : 'Salvar alterações'}
        </button>
      </form>
    </div>
  )
}