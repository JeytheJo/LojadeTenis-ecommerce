import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useCart } from '../context/CartContext'
import { buildWhatsAppLink, buildWhatsAppMessage, formatBRL } from '../lib/whatsapp'

export default function WhatsAppOrder() {
  const { items, total, clear } = useCart()
  const mensagem = buildWhatsAppMessage(items)
  const link = buildWhatsAppLink(items)

  return (
    <div className="bg-offwhite flex flex-col items-start w-full min-h-screen">
      <Header />

      <div className="flex flex-col gap-[24px] p-[64px] w-full">
        <p className="font-display text-ink text-[36px]">Pedido pronto para WhatsApp</p>
        <p className="font-sans text-navy text-[14px]">
          Esta é a mensagem preparada com os itens do seu carrinho.
        </p>

        <div className="flex flex-col md:flex-row gap-[40px] w-full">
          <div className="bg-sand flex flex-col gap-[16px] p-[32px] w-full md:w-[600px] whitespace-pre-wrap">
            <p className="font-semibold text-navy text-[10px]">PRÉVIA DA MENSAGEM</p>
            <p className="font-sans text-ink text-[14px]">{mensagem}</p>
            <p className="font-semibold text-ink text-[22px]">Total: {formatBRL(total)}</p>
          </div>

          <div className="flex flex-col gap-[20px] w-full md:w-[320px]">
            <p className="font-display text-ink text-[22px]">Finalize no WhatsApp</p>
            <p className="font-sans text-navy text-[14px]">
              Ao clicar abaixo, o WhatsApp abre com a mensagem já preenchida.
            </p>
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => clear()}
              className="bg-navy flex items-center justify-center p-[14px] font-medium text-offwhite text-[13px]"
            >
              Enviar pedido pelo WhatsApp
            </a>
            <Link
              to="/carrinho"
              className="bg-offwhite border border-steel flex items-center justify-center p-[14px] font-medium text-navy text-[13px]"
            >
              Editar carrinho
            </Link>
            <Link
              to="/"
              className="bg-offwhite border border-steel flex items-center justify-center p-[14px] font-medium text-navy text-[13px]"
            >
              Voltar à loja
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
