import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export function Header() {
  const { items } = useCart();
  const count = items.reduce((sum, i) => sum + i.quantidade, 0);

}