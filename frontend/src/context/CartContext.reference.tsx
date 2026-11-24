import { createContext, useContext, useState, ReactNode } from 'react'
import type { CartItem, Product } from '../types/product'

interface CartContextType {
  items: CartItem[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  updateQty: (productId: string, quantity: number) => void
  total: number
  clear: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  function addItem(product: Product) {
    setItems((prev) => {
      const existing = prev.find((i) => i.product._id === product._id)
      if (existing) {
        return prev.map((i) =>
          i.product._id === product._id ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
      return [...prev, { product, quantity: 1 }]
    })
  }

  function removeItem(productId: string) {
    setItems((prev) => prev.filter((i) => i.product._id !== productId))
  }

  function updateQty(productId: string, quantity: number) {
    setItems((prev) =>
      prev.map((i) => (i.product._id === productId ? { ...i, quantity: Math.max(1, quantity) } : i))
    )
  }

  function clear() {
    setItems([])
  }

  const total = items.reduce((sum, i) => sum + i.product.preco * i.quantity, 0)

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