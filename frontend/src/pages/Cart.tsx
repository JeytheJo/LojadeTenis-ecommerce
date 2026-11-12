import { useCart } from '../context/CartContext';
import { api } from '../lib/api';
import { useState } from 'react';
import { ApiResponse } from '../types';

export function Cart() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();
  const [sending, setSending] = useState(false);

  async function handleCheckout() {
    setSending(true);
    try {
      const payload = items.map((i) => ({
        nome: i.nome, cor: i.cor, tamanho: i.tamanho,
        quantidade: i.quantidade, preco: i.preco,
      }));

      const res = await api.post<ApiResponse<{ url: string }>>('/orders/whatsapp-link', { items: payload });
      const url = res.data.data?.url;
      if (url) {
        window.open(url, '_blank');
        clearCart();
      }
    } finally {
      setSending(false);
    }
  }

  if (items.length === 0) {
    return <div className="p-8 text-center">Seu carrinho está vazio.</div>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Carrinho</h1>

      {items.map((item) => (
        <div key={item._id} className="flex items-center justify-between border-b py-3">
          <div>
            <p className="font-semibold">{item.nome}</p>
            <p className="text-sm text-neutral-500">{item.cor} · tam. {item.tamanho}</p>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={1}
              value={item.quantidade}
              onChange={(e) => updateQuantity(item._id, Number(e.target.value))}
              className="w-14 border rounded text-center"
            />
            <span className="w-24 text-right">R$ {(item.preco * item.quantidade).toFixed(2)}</span>
            <button onClick={() => removeItem(item._id)} className="text-red-500">✕</button>
          </div>
        </div>
      ))}

      <div className="flex justify-between items-center mt-4 text-xl font-bold">
        <span>Total</span>
        <span>R$ {total.toFixed(2)}</span>
      </div>

      <button
        onClick={handleCheckout}
        disabled={sending}
        className="w-full mt-6 bg-green-600 text-white rounded py-3 font-semibold hover:bg-green-700 disabled:opacity-50"
      >
        {sending ? 'Gerando link...' : 'Finalizar pedido via WhatsApp'}
      </button>
    </div>
  );
}