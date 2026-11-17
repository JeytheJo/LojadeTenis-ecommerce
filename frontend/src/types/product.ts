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
}

export interface CartItem {
  product: Product
  size: number
  quantity: number
}
