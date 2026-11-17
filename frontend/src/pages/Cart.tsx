import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useCart } from '../context/CartContext'
import { formatBRL } from '../lib/whatsapp'

export default function Cart() {
  const { items, removeItem, updateQty, total } = useCart()
  const navigate = useNavigate()

  return (
    <div className="bg-offwhite flex flex-col items-start w-full min-h-screen">
      <Header />

      <div className="flex flex-col gap-[28px] p-[64px] w-full">
        <p className="font-display text-ink text-[36px]">Seu carrinho</p>
        <p className="font-sans text-navy text-[14px]">
          Escolha seus favoritos e prepare o pedido para o WhatsApp.
        </p>

        {items.length === 0 ? (
          <div className="bg-sand flex flex-col gap-[20px] p-[40px] w-full">
            <p className="font-display text-ink text-[28px]">Seu próximo par começa aqui.</p>
            <p className="font-sans text-navy text-[14px]">Você ainda não adicionou nenhum tênis.</p>
            <Link to="/" className="bg-navy flex items-center justify-center p-[14px] w-fit font-medium text-offwhite text-[13px]">
              Explorar produtos →
            </Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-[16px] w-full">
              {items.map((item) => (
                <div
                  key={`${item.product._id}-${item.size}`}
                  className="flex items-center justify-between border-b border-sand py-[16px] w-full gap-4"
                >
                  <div className="flex items-center gap-[16px]">
                    <div className="w-[60px] h-[60px] bg-sand flex items-center justify-center overflow-hidden">
                      {item.product.imageUrl && (
                        <img src={item.product.imageUrl} alt={item.product.name} className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-ink text-[14px]">{item.product.name}</p>
                      <p className="font-sans text-navy text-[12px]">Tamanho {item.size}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-[12px]">
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) => updateQty(item.product._id, item.size, Number(e.target.value))}
                      className="w-[56px] border border-steel p-[8px] text-center text-[13px]"
                    />
                    <p className="font-medium text-ink text-[14px] w-[100px] text-right">
                      {formatBRL(item.product.price * item.quantity)}
                    </p>
                    <button
                      onClick={() => removeItem(item.product._id, item.size)}
                      className="text-[12px] text-red-600 underline"
                    >
                      Remover
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between w-full pt-[16px]">
              <p className="font-medium text-ink text-[16px]">Total</p>
              <p className="font-semibold text-ink text-[22px]">{formatBRL(total)}</p>
            </div>

            <button
              onClick={() => navigate('/pedido-whatsapp')}
              className="bg-navy flex items-center justify-center p-[16px] w-full font-medium text-offwhite text-[13px]"
            >
              Finalizar pedido pelo WhatsApp →
            </button>
          </>
        )}

        <Link
          to="/"
          className="bg-offwhite border border-steel flex items-center justify-center p-[14px] font-medium text-navy text-[13px]"
        >
          ← Continuar comprando
        </Link>
      </div>

      <Footer />
    </div>
  )
}
