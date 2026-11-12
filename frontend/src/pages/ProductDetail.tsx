import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../lib/api';
import { Product, ApiResponse } from '../types';
import { useCart } from '../context/CartContext';

export function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const { addItem } = useCart();

  useEffect(() => {
    if (!id) return;
    api.get<ApiResponse<Product>>(`/products/${id}`)
      .then((res) => setProduct(res.data.data ?? null));
  }, [id]);

  if (!product) return <div className="p-8 text-center">Carregando...</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <img
        src={product.imageUrl || 'https://placehold.co/600x400?text=Sem+imagem'}
        alt={product.nome}
        className="w-full rounded-lg mb-4"
      />
      <h1 className="text-2xl font-bold">{product.nome}</h1>
      <p className="text-neutral-500">{product.marca} · {product.categoria}</p>
      <p className="mt-2">Cor: {product.cor} · Tamanho: {product.tamanho}</p>
      <p className="text-2xl font-bold mt-4">R$ {product.preco.toFixed(2)}</p>
      <button
        onClick={() => addItem(product)}
        className="mt-4 bg-neutral-900 text-white rounded py-2 px-6 hover:bg-neutral-700"
      >
        Adicionar ao carrinho
      </button>
    </div>
  );
}