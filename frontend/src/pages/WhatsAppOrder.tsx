import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const WHATSAPP_NUMBER = '5586981115718' 

function formatBRL(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export default function WhatsAppOrder() {
  const navigate = useNavigate()
  const { items, totalPrice, clearCart } = useCart()

  // Filtra itens inválidos antes de renderizar
  const validItems = items.filter((i) => i && i.product && i.product._id)

  if (validItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-[16px] px-[64px]">
        <p className="font-sans text-steel text-[13px]">Sua sacola está vazia.</p>
        <button
          onClick={() => navigate('/')}
          className="font-sans text-[13px] text-navy underline"
        >
          Voltar ao catálogo
        </button>
      </div>
    )
  }

  // Monta o texto da mensagem
  const linhasProdutos = validItems
    .map(
      (i) =>
        `${i.quantity}x ${i.product.nome} (${i.product.cor}, tam. ${i.product.tamanho}) - ${formatBRL(i.product.preco * i.quantity)}`
    )
    .join('\n')

  const mensagem = [
    'Olá, Kicks&Co.! Quero fazer este pedido:',
    '',
    linhasProdutos,
    '',
    `Total: ${formatBRL(totalPrice)}`,
    '',
    'Podem confirmar a disponibilidade e o prazo de entrega?',
  ].join('\n')

  function handleEnviar() {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensagem)}`
    window.open(url, '_blank')
    clearCart()
    navigate('/')
  }

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Header mínimo sem ícones de sacola/nav para não confundir */}
      <header className="w-full px-[64px] py-[24px] border-b border-lightgray">
        <span className="font-display text-ink text-[20px]">Kicks&amp;Co.</span>
      </header>

      <main className="flex flex-col gap-[32px] px-[64px] py-[48px] max-w-[720px]">
        <h1 className="font-display text-ink text-[32px]">Finalizar pedido pelo WhatsApp</h1>

        <p className="font-sans text-navy text-[13px]">
          Revise a mensagem abaixo. Ao confirmar, o WhatsApp abrirá com o pedido já formatado,
          pronto para enviar para a loja.
        </p>

        {/* Preview da mensagem */}
        <pre className="bg-offwhite border border-lightgray p-[24px] font-sans text-[13px] text-ink leading-relaxed whitespace-pre-wrap rounded-none">
          {mensagem}
        </pre>

        {/* Total */}
        <div className="flex items-center justify-between border-t border-lightgray pt-[16px]">
          <p className="font-sans text-ink text-[14px] font-semibold">Total do pedido</p>
          <p className="font-display text-ink text-[20px]">{formatBRL(totalPrice)}</p>
        </div>

        {/* Ações */}
        <div className="flex items-center justify-between pt-[8px]">
          <button
            onClick={() => navigate('/carrinho')}
            className="font-sans text-[13px] text-navy underline"
          >
            Voltar à sacola
          </button>
          <button
            onClick={handleEnviar}
            className="bg-navy text-offwhite font-sans text-[14px] px-[32px] py-[14px] hover:bg-ink transition-colors"
          >
            Enviar pedido via WhatsApp
          </button>
        </div>
      </main>
    </div>
  )
}