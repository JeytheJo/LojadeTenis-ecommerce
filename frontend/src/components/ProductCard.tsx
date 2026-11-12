import { Link } from 'react-router-dom';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <div className="border rounded-lg overflow-hidden flex flex-col">
      <Link to={`/produto/${product._id}`}>
        <img
          src={product.imageUrl || 'https://placehold.co/400x300?text=Sem+imagem'}
          alt={product.nome}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-4 flex flex-col gap-1 flex-1">
        <span className="text-xs text-neutral-500">{product.marca}</span>
        <h3 className="font-semibold">{product.nome}</h3>
        <span className="text-lg font-bold mt-auto">
          R$ {product.preco.toFixed(2)}
        </span>
        <button
          onClick={() => addItem(product)}
          className="mt-2 bg-neutral-900 text-white rounded py-2 hover:bg-neutral-700"
        >
          Adicionar ao carrinho
        </button>
      </div>
    </div>
  );
}