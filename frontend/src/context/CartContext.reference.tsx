// REFERÊNCIA: use este arquivo só se o seu CartContext atual NÃO tiver
// addItem/removeItem/updateQty/total/clear com esta assinatura.
// Se já tiver um CartContext funcionando, ignore este arquivo e apenas
// confira se os nomes batem com o que as páginas esperam.

import { createContext, useContext, useState, ReactNode } from 'react'
import type { CartItem, Product } from '../types/product'

interface CartContextType {
  items: CartItem[]
  addItem: (product: Product, size: number) => void
  removeItem: (productId: string, size: number) => void
  updateQty: (productId: string, size: number, quantity: number) => void
  total: number
  clear: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  function addItem(product: Product, size: number) {
    setItems((prev) => {
      const existing = prev.find((i) => i.product._id === product._id && i.size === size)
      if (existing) {
        return prev.map((i) =>
          i.product._id === product._id && i.size === size ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
      return [...prev, { product, size, quantity: 1 }]
    })
  }

  function removeItem(productId: string, size: number) {
    setItems((prev) => prev.filter((i) => !(i.product._id === productId && i.size === size)))
  }

  function updateQty(productId: string, size: number, quantity: number) {
    setItems((prev) =>
      prev.map((i) =>
        i.product._id === productId && i.size === size ? { ...i, quantity: Math.max(1, quantity) } : i
      )
    )
  }

  function clear() {
    setItems([])
  }

  const total = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, total, clear }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart deve ser usado dentro de <CartProvider>')
  return ctx
}
