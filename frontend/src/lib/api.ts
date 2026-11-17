import type { Product } from '../types/product'

const API_URL = import.meta.env.VITE_API_URL as string

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('kicksco_token')
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  })

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.message || `Erro ${res.status} ao chamar ${path}`)
  }
  // No content
  if (res.status === 204) return undefined as T
  return res.json()
}

// ----- Produtos (MongoDB) -----
export const getProducts = () => request<Product[]>('/products')
export const getProduct = (id: string) => request<Product>(`/products/${id}`)
export const createProduct = (data: Omit<Product, '_id' | 'createdAt'>) =>
  request<Product>('/products', { method: 'POST', body: JSON.stringify(data) })

// ----- Histórico "vistos recentemente" (Redis) -----
export const getRecentlyViewed = () => request<Product[]>('/history')
export const registerView = (productId: string) =>
  request<void>(`/history/${productId}`, { method: 'POST' })
export const clearHistory = () => request<void>('/history', { method: 'DELETE' })
