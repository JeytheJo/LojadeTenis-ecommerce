import { env } from '../config/env';
import { WhatsAppOrderPayload } from '../types';

/**
 * Gera a URL do WhatsApp com o pedido formatado.
 * Exemplo de uso no front-end: window.open(url, '_blank')
 */
export function buildWhatsAppUrl(payload: WhatsAppOrderPayload): string {
  const lines: string[] = ['*Novo Pedido — Kicks&Co*\n'];

  if (payload.customerName) {
    lines.push(`Cliente: ${payload.customerName}`);
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

interface CartItem {
  nome:     string;
  cor:      string;
  tamanho:  number;
  quantidade: number;
  preco:    number;
}

export function buildWhatsAppLink(phone: string, items: CartItem[]): { message: string; url: string } {
  const lines = items.map(
    i => `• ${i.quantidade}x ${i.nome} (${i.cor}, tam. ${i.tamanho}) — R$ ${(i.preco * i.quantidade).toFixed(2)}`,
  );

  const total = items.reduce((sum, i) => sum + i.preco * i.quantidade, 0);

  const message = [
    'Olá! Gostaria de fazer o seguinte pedido:',
    '',
    ...lines,
    '',
    `*Total: R$ ${total.toFixed(2)}*`,
  ].join('\n');

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return { message, url };
}