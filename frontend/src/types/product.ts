export interface Product {
  _id: string
  nome: string
  marca: string
  categoria: string
  cor: string
  tamanho: number
  preco: number
  estoque: number
  imageUrl?: string
  description?: string
  ativo?: boolean
  createdAt?: string
}

export interface CartItem {
  product: Product
  quantity: number
}