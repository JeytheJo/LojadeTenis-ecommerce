export interface Product {
  _id: string
  name: string
  sku: string
  price: number
  category: string
  brand?: string
  sizes: number[]
  description?: string
  imageUrl?: string
  createdAt?: string
  featured?: boolean
}

export interface CartItem {
  product: Product
  size: number
  quantity: number
}