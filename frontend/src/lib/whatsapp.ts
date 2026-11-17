import type { CartItem } from '../types/product'

// Troque pelo número real da loja (DDI + DDD + número, só dígitos)
const WHATSAPP_NUMBER = '55XXXXXXXXXXX'

export function buildWhatsAppMessage(items: CartItem[]): string {
  const linhas = items.map(
    (i) => `${i.quantity}x ${i.product.name} (tam. ${i.size}) - R$ ${(i.product.price * i.quantity).toFixed(2)}`
  )
  const total = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0)

  const texto = [
    `Olá, Kicks&Co.! Quero fazer este pedido:`,
    '',
    ...linhas,
    '',
    `Total: R$ ${total.toFixed(2)}`,
    '',
    'Podem confirmar a disponibilidade e o prazo de entrega?',
  ].join('\n')

  return texto
}

export function buildWhatsAppLink(items: CartItem[]): string {
  const texto = buildWhatsAppMessage(items)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`
}

export function formatBRL(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}
