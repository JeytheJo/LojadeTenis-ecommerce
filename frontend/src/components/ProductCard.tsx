import { Heart, ShoppingBag } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'
import { registerView } from '../lib/api'
import type { Product } from '../types/product'

function formatBRL(value: unknown): string {
  if (typeof value !== 'number' || isNaN(value)) return 'R$ --'
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

interface ProductCardProps {
  product: Product
  onAdd: (product: Product) => void
}

export default function ProductCard({ product, onAdd }: ProductCardProps) {
  const navigate = useNavigate()
  const { isFavorite, toggleFavorite } = useFavorites()
  const favorito = isFavorite(product._id)

  function handleCardClick() {
    registerView(product._id)
    navigate(`/produto/${product._id}`)
  }

  return (
    <div className="flex flex-col gap-[12px] group cursor-pointer">
      {/* Imagem */}
      <div
        className="relative w-full aspect-square bg-lightgray overflow-hidden"
        onClick={handleCardClick}
      >
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.nome}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-steel font-sans text-[12px]">
            sem imagem
          </div>
        )}

        {/* Botão favorito */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            toggleFavorite(product._id)
          }}
          className="absolute top-[12px] right-[12px] w-[32px] h-[32px] bg-offwhite flex items-center justify-center"
          aria-label={favorito ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          <Heart
            className="w-4 h-4"
            fill={favorito ? '#e63946' : 'none'}
            stroke={favorito ? '#e63946' : 'currentColor'}
          />
        </button>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-[4px]" onClick={handleCardClick}>
        <p className="font-sans text-steel text-[11px] uppercase tracking-wider">{product.marca}</p>
        <p className="font-sans text-ink text-[14px] leading-snug">{product.nome}</p>
        <p className="font-sans text-steel text-[12px]">Tam. {product.tamanho}</p>
      </div>

      {/* Preço + botão */}
      <div className="flex items-center justify-between mt-auto">
        <p className="font-display text-ink text-[16px]">{formatBRL(product.preco)}</p>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onAdd(product)
          }}
          className="w-[36px] h-[36px] bg-ink flex items-center justify-center hover:bg-navy transition-colors"
          aria-label="Adicionar à sacola"
        >
          <ShoppingBag className="w-4 h-4 text-offwhite" />
        </button>
      </div>
    </div>
  )
}