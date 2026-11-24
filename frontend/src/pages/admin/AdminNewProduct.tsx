<<<<<<< HEAD
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createProduct } from '../../lib/api'
=======
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { createProduct } from '../../lib/api'

const CATEGORIAS = ['sneakers', 'casual', 'sport', 'sociais']
>>>>>>> 275f2cc (feat: update product detail and recently viewed pages with improved loading states and error handling)

export default function AdminNewProduct() {
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
<<<<<<< HEAD
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
=======

  useEffect(() => {
    if (!authLoading && !session) navigate('/admin/login')
  }, [session, authLoading, navigate])

  if (authLoading || !session) {
    return <div className="p-[64px] font-sans text-steel text-[13px]">Carregando...</div>
  }
>>>>>>> 275f2cc (feat: update product detail and recently viewed pages with improved loading states and error handling)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      await createProduct({
        nome,
        marca,
        categoria,
        cor,
        tamanho: Number(tamanho),
        preco: Number(preco),
        estoque: Number(estoque),
        imageUrl: imageUrl || undefined,
        description: description || undefined,
        ativo: true,
      })
      navigate('/admin/produtos')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao cadastrar produto')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col w-full px-[64px] py-[48px] max-w-[560px] gap-[24px]">
      <p className="font-display text-ink text-[28px]">Cadastrar produto</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-[16px]">
        <input
          required
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="border border-sand px-[16px] py-[12px] font-sans text-[14px]"
        />
        <input
          required
          placeholder="Marca"
          value={marca}
          onChange={(e) => setMarca(e.target.value)}
          className="border border-sand px-[16px] py-[12px] font-sans text-[14px]"
        />
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="border border-sand px-[16px] py-[12px] font-sans text-[14px]"
        >
          {CATEGORIAS.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <input
          required
          placeholder="Cor"
          value={cor}
          onChange={(e) => setCor(e.target.value)}
          className="border border-sand px-[16px] py-[12px] font-sans text-[14px]"
        />
        <input
          required
          type="number"
          placeholder="Tamanho (ex: 42)"
          value={tamanho}
          onChange={(e) => setTamanho(e.target.value)}
          className="border border-sand px-[16px] py-[12px] font-sans text-[14px]"
        />
        <input
          required
          type="number"
          step="0.01"
          placeholder="Preço (R$)"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          className="border border-sand px-[16px] py-[12px] font-sans text-[14px]"
        />
        <input
          required
          type="number"
          placeholder="Estoque"
          value={estoque}
          onChange={(e) => setEstoque(e.target.value)}
          className="border border-sand px-[16px] py-[12px] font-sans text-[14px]"
        />
        <input
          placeholder="URL da imagem (ex: /products/sku-123.jpg)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="border border-sand px-[16px] py-[12px] font-sans text-[14px]"
        />
        <textarea
          placeholder="Descrição (opcional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-sand px-[16px] py-[12px] font-sans text-[14px]"
          rows={3}
        />

        {error && <p className="font-sans text-[12px] text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="bg-navy text-offwhite font-sans text-[14px] px-[24px] py-[14px] disabled:opacity-50"
        >
          {submitting ? 'Salvando...' : 'Cadastrar'}
        </button>
      </form>
    </div>
  )
}