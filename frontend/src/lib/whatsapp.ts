import type { CartItem } from '../types/product'

const WHATSAPP_NUMBER = '55XXXXXXXXXXX'

export function buildWhatsAppMessage(items: CartItem[]): string {
  const linhas = items.map(
    (i) =>
      `${i.quantity}x ${i.product.nome} (${i.product.cor}, tam. ${i.product.tamanho}) - R$ ${(
        i.product.preco * i.quantity
      ).toFixed(2)}`
  )
  const total = items.reduce((sum, i) => sum + i.product.preco * i.quantity, 0)

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

export function formatBRL(value: number | undefined | null): string {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    return 'R$ --'
  }
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}