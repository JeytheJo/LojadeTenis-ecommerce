import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createProduct } from '../../lib/api'

export default function AdminNewProduct() {
  // Estados alinhados com o MongoDB
  const [nome, setNome] = useState('')
  const [marca, setMarca] = useState('')
  const [categoria, setCategoria] = useState('')
  const [cor, setCor] = useState('')
  const [tamanho, setTamanho] = useState('')
  const [preco, setPreco] = useState('')
  const [estoque, setEstoque] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    
    try {
      await createProduct({
        nome,
        marca,
        categoria,
        cor,
        tamanho: Number(tamanho),
        preco: Number(preco.replace(',', '.')),
        estoque: Number(estoque) || 0,
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
      {/* ... cabeçalho igual ... */}

      <div className="flex flex-col gap-[28px] p-[64px] w-full">
        {/* ... título igual ... */}

        <form onSubmit={handleSubmit} className="bg-offwhite flex flex-col gap-[20px] p-[32px] w-full max-w-[700px]">
          <div className="flex flex-col gap-[8px]">
            <label className="font-medium text-ink text-[13px]">Nome do produto *</label>
            <input
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex.: Ultrabost 22"
              className="bg-offwhite border border-steel p-[16px] text-[14px] text-navy"
            />
          </div>

          <div className="flex gap-[24px]">
            <div className="flex flex-col gap-[8px] w-1/2">
              <label className="font-medium text-ink text-[13px]">Marca *</label>
              <input
                required
                value={marca}
                onChange={(e) => setMarca(e.target.value)}
                placeholder="Ex.: Adidas"
                className="bg-offwhite border border-steel p-[16px] text-[14px] text-navy"
              />
            </div>
            <div className="flex flex-col gap-[8px] w-1/2">
              <label className="font-medium text-ink text-[13px]">Preço (R$) *</label>
              <input
                required
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
                placeholder="Ex.: 749,90"
                className="bg-offwhite border border-steel p-[16px] text-[14px] text-navy"
              />
            </div>
          </div>

          <div className="flex gap-[24px]">
            <div className="flex flex-col gap-[8px] w-1/2">
              <label className="font-medium text-ink text-[13px]">Categoria *</label>
              <input
                required
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                placeholder="Ex.: Tênis Esportivo"
                className="bg-offwhite border border-steel p-[16px] text-[14px] text-navy"
              />
            </div>
            <div className="flex flex-col gap-[8px] w-1/2">
              <label className="font-medium text-ink text-[13px]">Cor *</label>
              <input
                required
                value={cor}
                onChange={(e) => setCor(e.target.value)}
                placeholder="Ex.: Preto"
                className="bg-offwhite border border-steel p-[16px] text-[14px] text-navy"
              />
            </div>
          </div>

          <div className="flex gap-[24px]">
            <div className="flex flex-col gap-[8px] w-1/2">
              <label className="font-medium text-ink text-[13px]">Tamanho *</label>
              <input
                required
                type="number"
                value={tamanho}
                onChange={(e) => setTamanho(e.target.value)}
                placeholder="Ex.: 39"
                className="bg-offwhite border border-steel p-[16px] text-[14px] text-navy"
              />
            </div>
            <div className="flex flex-col gap-[8px] w-1/2">
              <label className="font-medium text-ink text-[13px]">Estoque *</label>
              <input
                required
                type="number"
                value={estoque}
                onChange={(e) => setEstoque(e.target.value)}
                placeholder="Ex.: 8"
                className="bg-offwhite border border-steel p-[16px] text-[14px] text-navy"
              />
            </div>
          </div>

          <div className="flex flex-col gap-[8px]">
            <label className="font-medium text-ink text-[13px]">URL da Imagem</label>
            <input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Ex.: /produtos/ultraboost.png"
              className="bg-offwhite border border-steel p-[16px] text-[14px] text-navy"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-navy text-offwhite p-[16px] font-medium text-[14px] mt-4"
          >
            {loading ? 'Salvando...' : 'Cadastrar Produto'}
          </button>
        </form>
      </div>
    </div>
  )
}