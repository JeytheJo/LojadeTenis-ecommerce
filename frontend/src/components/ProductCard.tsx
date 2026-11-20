import { Link } from 'react-router-dom'
import { Heart, Plus } from 'lucide-react'
import type { Product } from '../types/product'
import { formatBRL } from '../lib/whatsapp'

const PARCELAS = 3

export default function ProductCard({ product, onAdd }: { product: Product; onAdd?: (p: Product) => void }) {
  const valorParcela = product.price / PARCELAS

  return (
    <Link to={`/produto/${product._id}`} className="flex flex-col gap-[12px] w-[310px]">
      <div className="relative w-[310px] h-[320px] bg-sand">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-steel text-[12px]">
            Sem imagem
          </div>
        )}
        {/* Camada do Figma: tag "MAIS VENDIDO" (canto superior esquerdo do card) */}
        {product.featured && (
          <div className="absolute top-[12px] left-[12px] bg-navy px-[8px] py-[5px]">
            <p className="text-offwhite text-[9px] font-medium">MAIS VENDIDO</p>
          </div>
        )}
        <button
          className="absolute bg-offwhite p-[10px] rounded-full top-[12px] right-[12px]"
          onClick={(e) => e.preventDefault()}
          aria-label="Favoritar"
        >
          <Heart className="w-5 h-5 text-ink" />
        </button>
      </div>
      <div className="flex flex-col gap-[4px]">
        <p className="font-medium text-ink text-[16px]">{product.name}</p>
        <p className="font-sans text-steel text-[12px]">
          {product.category}{product.brand ? ` · ${product.brand}` : ''}
        </p>
      </div>
      <div className="flex items-center justify-between w-full">
        <p className="font-semibold text-ink text-[16px]">{formatBRL(product.price)}</p>
        <button
          className="bg-steel p-[6px]"
          onClick={(e) => {
            e.preventDefault()
            onAdd?.(product)
          }}
          aria-label="Adicionar à sacola"
        >
          <Plus className="w-5 h-5 text-offwhite" />
        </button>
      </div>
      <p className="font-sans text-steel text-[12px]">
        ou {PARCELAS}x de {formatBRL(valorParcela)}
      </p>
    </Link>
  )
}