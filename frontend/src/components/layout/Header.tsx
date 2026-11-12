import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export function Header() {
  const { items } = useCart();
  const count = items.reduce((sum, i) => sum + i.quantidade, 0);

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-neutral-900 text-white">
      <Link to="/" className="text-xl font-bold">Kicks&Co.</Link>
      <Link to="/cart" className="relative">
        
        {count > 0 && (
          <span className="absolute -top-2 -right-3 bg-red-500 text-xs rounded-full px-1.5">
            {count}
          </span>
        )}
      </Link>
    </header>
  );
}