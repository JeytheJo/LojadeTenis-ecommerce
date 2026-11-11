import { env } from '../config/env';
import { WhatsAppOrderPayload } from '../types';

/**
 * Gera a URL do WhatsApp com o pedido formatado.
 * Exemplo de uso no front-end: window.open(url, '_blank')
 */
export function buildWhatsAppUrl(payload: WhatsAppOrderPayload): string {
  const lines: string[] = ['*Novo Pedido — Kicks&Co*\n'];

  if (payload.customerName) {
    lines.push(`👤 Cliente: ${payload.customerName}`);
  }

  lines.push('');
  payload.items.forEach((item, i) => {
    lines.push(
      `${i + 1}. *${item.name}*\n` +
      `   Tamanho: ${item.size} | Qtd: ${item.quantity}\n` +
      `   R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}`,
    );
  });

  lines.push(`\n*Total: R$ ${payload.total.toFixed(2).replace('.', ',')}*`);

  const message = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${env.WHATSAPP_PHONE}?text=${message}`;
}
