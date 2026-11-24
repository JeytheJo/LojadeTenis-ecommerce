import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { buildWhatsAppLink, buildWhatsAppMessage, formatBRL } from '../lib/whatsapp'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function WhatsAppOrder() {
  const { items, total, clear } = useCart()
  const navigate = useNavigate()

  useEffect(() => {
    if (items.length === 0) navigate('/')
  }, [items.length, navigate])

  if (items.length === 0) return null

  const mensagem = buildWhatsAppMessage(items)
  const link = buildWhatsAppLink(items)

  function handleEnviar() {
    window.open(link, '_blank')
    clear()
  }

  return (
    <div className="flex flex-col w-full">
      <Header />
      <div className="flex flex-col gap-[24px] px-[64px] py-[64px] max-w-[640px]">
        <p className="font-display text-ink text-[28px]">Finalizar pedido pelo WhatsApp</p>
        <p className="font-sans text-steel text-[13px]">
          Revise a mensagem abaixo. Ao confirmar, o WhatsApp abrirá com o pedido já formatado, pronto
          para enviar para a loja.
        </p>

        <pre className="bg-offwhite font-sans text-[13px] text-ink whitespace-pre-wrap p-[20px] border border-sand">
          {mensagem}
        </pre>

        <div className="flex justify-between font-semibold text-[15px] text-ink">
          <span>Total do pedido</span>
          <span>{formatBRL(total)}</span>
        </div>

        <div className="flex gap-[16px]">
          <Link to="/carrinho" className="font-sans text-navy text-[13px] self-center">
            Voltar à sacola
          </Link>
          <button
            onClick={handleEnviar}
            className="bg-navy text-offwhite font-sans text-[14px] px-[32px] py-[16px] ml-auto"
          >
            Enviar pedido via WhatsApp
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}