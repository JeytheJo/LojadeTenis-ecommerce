import { Link } from 'react-router-dom'
import { Search, User, ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'
import DemoBanner from './DemoBanner'

export default function Header() {
  const { items } = useCart()
  const count = items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <div className="flex flex-col items-start w-full">
      <DemoBanner />
      <div className="bg-offwhite flex items-center justify-between px-[64px] py-[24px] w-full">
        <Link to="/">
          <p className="font-display text-ink text-[32px]">Kicks&amp;Co.</p>
        </Link>
        <nav className="flex gap-[28px] font-sans text-ink text-[13px]">
          <Link to="/">Catálogo</Link>
          <Link to="/vistos-recentemente">Vistos recentemente</Link>
          <Link to="/admin/login">Admin</Link>
        </nav>
        <div className="flex gap-[24px] items-center">
          <Search className="w-6 h-6 text-ink" />
          <Link to="/admin/login">
            <User className="w-6 h-6 text-ink" />
          </Link>
          <Link to="/carrinho" className="relative">
            <ShoppingBag className="w-6 h-6 text-ink" />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-navy text-offwhite text-[10px] rounded-full w-[18px] h-[18px] flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </div>
  )
}
