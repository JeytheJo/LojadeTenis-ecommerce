import { Link, useNavigate } from 'react-router-dom'
import { Minus, Plus, Trash2 } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useCart } from '../context/CartContext'
import { formatBRL } from '../lib/whatsapp'

export default function Cart() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart()
  const navigate = useNavigate()

  const validItems = items.filter((item) => item && item.product && item.product._id)

  if (validItems.length === 0) {
    return (
      <div className="flex flex-col w-full">
        <Header />
        <div className="flex flex-col items-center gap-[16px] px-[64px] py-[96px]">
          <p className="font-display text-ink text-[24px]">Sua sacola está vazia</p>
          <Link to="/" className="font-sans text-navy text-[13px]">
            Voltar ao catálogo
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col w-full">
      <Header />
      <div className="grid grid-cols-[1fr_360px] gap-[64px] px-[64px] py-[64px] w-full">
        <div className="flex flex-col gap-[24px]">
          <p className="font-display text-ink text-[28px]">Sua sacola</p>
          {validItems.map((item) => (
            <div key={item.product._id} className="flex gap-[16px] border-b border-sand pb-[24px]">
              <div className="w-[120px] h-[120px] bg-sand shrink-0">
                {item.product.imageUrl ? (
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.nome}
                    className="w-full h-full object-cover"
                  />
                ) : null}
              </div>
              <div className="flex flex-col gap-[6px] flex-1">
                <p className="font-medium text-ink text-[15px]">{item.product.nome}</p>
                <p className="font-sans text-steel text-[12px]">
                  {item.product.cor} · tam. {item.product.tamanho}
                </p>
                <p className="font-semibold text-ink text-[14px]">{formatBRL(item.product.preco)}</p>
                <div className="flex items-center gap-[12px] mt-[4px]">
                  <button
                    onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                    className="p-[4px] border border-sand"
                    aria-label="Diminuir quantidade"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-sans text-[13px] w-[20px] text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                    className="p-[4px] border border-sand"
                    aria-label="Aumentar quantidade"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => removeItem(item.product._id)}
                    className="ml-[12px] text-steel"
                    aria-label="Remover item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-[16px] bg-offwhite p-[24px] h-fit">
          <p className="font-display text-ink text-[20px]">Resumo</p>
          <div className="flex justify-between font-sans text-[13px] text-steel">
            <span>Subtotal</span>
            <span>{formatBRL(totalPrice)}</span>
          </div>
          <div className="flex justify-between font-semibold text-[15px] text-ink border-t border-sand pt-[12px]">
            <span>Total</span>
            <span>{formatBRL(totalPrice)}</span>
          </div>
          <button
            onClick={() => navigate('/pedido-whatsapp')}
            className="bg-navy text-offwhite font-sans text-[14px] px-[24px] py-[16px] w-full mt-[8px]"
          >
            Comprar via WhatsApp
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}