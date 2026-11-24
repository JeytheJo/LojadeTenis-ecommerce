import type { Product } from '../types/product'
import { supabase } from './supabase'

const API_URL = import.meta.env.VITE_API_URL as string

async function getAuthToken(): Promise<string | null> {
  const { data: { session } } = await supabase.auth.getSession()
  return session?.access_token ?? null
}

const VISITOR_KEY = 'kicksco:visitorId'
function getVisitorId(): string {
  let id = localStorage.getItem(VISITOR_KEY)
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem(VISITOR_KEY, id)
  }
  return id
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = await getAuthToken()
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'X-Visitor-Id': getVisitorId(),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.message || `Erro ${res.status} ao chamar ${path}`)
  }
  if (res.status === 204) return undefined as T
  return res.json()
}

// ----- Produtos (MongoDB) -----
export async function getProducts(): Promise<Product[]> {
  const res = await request<{ success: boolean; data: { products: Product[] } }>('/products')
  return res?.data?.products ?? []
}

export async function getProduct(id: string): Promise<Product> {
  const res = await request<{ success: boolean; data: Product }>(`/products/${id}`)
  return res?.data ?? (res as unknown as Product)
}

export async function createProduct(data: Omit<Product, '_id' | 'createdAt'>): Promise<Product> {
  const res = await request<{ success: boolean; data: Product }>('/products', {
    method: 'POST',
    body: JSON.stringify(data),
  })
  return res?.data ?? (res as unknown as Product)
}

export async function updateProduct(id: string, data: Partial<Product>): Promise<Product> {
  const res = await request<{ success: boolean; data: Product }>(`/products/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  })
  return res?.data ?? (res as unknown as Product)
}

export async function deleteProduct(id: string): Promise<void> {
  await request<void>(`/products/${id}`, { method: 'DELETE' })
}

// ----- Histórico "vistos recentemente" (Redis) -----
export async function getRecentlyViewed(): Promise<Product[]> {
  const res = await request<{ success: boolean; data: Product[] }>('/history');
  return res?.data ?? [];
}

export async function registerView(productId: string): Promise<void> {
  try {
    await request<void>(`/history/${productId}`, { method: 'POST' })
  } catch {
    // backend ainda não respondendo — ignora
  }
}

export async function clearHistory(): Promise<void> {
  try {
    await request<void>('/history', { method: 'DELETE' })
  } catch {}
}