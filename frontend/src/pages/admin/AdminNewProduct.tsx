import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createProduct } from '../../lib/api'
import { useAuth } from '../../context/AuthContext'

export default function AdminNewProduct() {
  const [name, setName] = useState('')
  const [sku, setSku] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [brand, setBrand] = useState('')
  const [sizesText, setSizesText] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { session, loading: authLoading } = useAuth()

  useEffect(() => {
    if (authLoading) return
    if (!session) navigate('/admin/login')
  }, [session, authLoading, navigate])

  if (authLoading || !session) return null

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const sizes = sizesText
        .split(',')
        .map((s) => Number(s.trim()))
        .filter((n) => !Number.isNaN(n))

      await createProduct({
        name,
        sku,
        price: Number(price.replace(',', '.')),
        category,
        brand: brand || undefined,
        sizes,
        description: description || undefined,
        imageUrl: imageUrl || undefined,
      })

      navigate('/admin/produtos')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar produto.')
    } finally {
      setLoading(false)
    }
  }

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
        <Link to="/admin/produtos" className="font-medium text-navy text-[13px]">
          Ver loja
        </Link>
      </div>

      <div className="flex flex-col gap-[28px] p-[64px] w-full">
        <div className="flex items-center justify-between w-full">
          <div>
            <p className="font-display text-ink text-[36px]">Novo produto</p>
            <p className="font-semibold text-navy text-[10px]">MONGODB · CADASTRO</p>
          </div>
          <Link
            to="/admin/produtos"
            className="bg-offwhite border border-steel flex items-center justify-center p-[16px] font-medium text-navy text-[13px]"
          >
            ← Voltar aos produtos
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="bg-offwhite flex flex-col gap-[20px] p-[32px] w-full max-w-[700px]">
          <div className="flex flex-col gap-[8px]">
            <label className="font-medium text-ink text-[13px]">Nome do produto *</label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex.: Chuck Taylor All Star"
              className="bg-offwhite border border-steel p-[16px] text-[14px] text-navy"
            />
          </div>

          <div className="flex gap-[24px]">
            <div className="flex flex-col gap-[8px] w-1/2">
              <label className="font-medium text-ink text-[13px]">SKU *</label>
              <input
                required
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                placeholder="Ex.: KCK-005"
                className="bg-offwhite border border-steel p-[16px] text-[14px] text-navy"
              />
            </div>
            <div className="flex flex-col gap-[8px] w-1/2">
              <label className="font-medium text-ink text-[13px]">Preço (R$) *</label>
              <input
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Ex.: 299,00"
                className="bg-offwhite border border-steel p-[16px] text-[14px] text-navy"
              />
            </div>
          </div>

          <div className="flex gap-[24px]">
            <div className="flex flex-col gap-[8px] w-1/2">
              <label className="font-medium text-ink text-[13px]">Categoria *</label>
              <input
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Ex.: Casual, Corrida, Sociais"
                className="bg-offwhite border border-steel p-[16px] text-[14px] text-navy"
              />
            </div>
            <div className="flex flex-col gap-[8px] w-1/2">
              <label className="font-medium text-ink text-[13px]">Marca</label>
              <input
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="Ex.: Nike, Adidas"
                className="bg-offwhite border border-steel p-[16px] text-[14px] text-navy"
              />
            </div>
          </div>

          <div className="flex flex-col gap-[8px]">
            <label className="font-medium text-ink text-[13px]">Tamanhos disponíveis *</label>
            <input
              required
              value={sizesText}
              onChange={(e) => setSizesText(e.target.value)}
              placeholder="Ex.: 38, 39, 40, 41, 42"
              className="bg-offwhite border border-steel p-[16px] text-[14px] text-navy"
            />
          </div>

          <div className="flex flex-col gap-[8px]">
            <label className="font-medium text-ink text-[13px]">Descrição</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva o material e os diferenciais do tênis."
              className="bg-offwhite border border-steel p-[16px] text-[14px] text-navy min-h-[80px]"
            />
          </div>

          <div className="flex flex-col gap-[8px]">
            <label className="font-medium text-ink text-[13px]">URL da imagem</label>
            <input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://..."
              className="bg-offwhite border border-steel p-[16px] text-[14px] text-navy"
            />
            <p className="font-sans text-navy text-[11px]">
              Cole aqui a URL pública da imagem (ex.: link gerado pelo Supabase Storage).
            </p>
          </div>

          {error && <p className="text-red-600 text-[13px]">{error}</p>}

          <div className="flex gap-[16px]">
            <button
              type="submit"
              disabled={loading}
              className="bg-navy flex items-center justify-center p-[16px] font-medium text-offwhite text-[13px] disabled:opacity-60"
            >
              {loading ? 'Salvando...' : 'Salvar produto'}
            </button>
            <Link
              to="/admin/produtos"
              className="bg-offwhite border border-steel flex items-center justify-center p-[16px] font-medium text-navy text-[13px]"
            >
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
