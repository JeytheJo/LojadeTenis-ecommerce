export interface Product {
  _id: string;
  nome: string;
  marca: string;
  categoria: string;
  cor: string;
  tamanho: number;
  preco: number;
  estoque: number;
  imageUrl?: string;
  ativo: boolean;
}

export interface CartItem extends Product {
  quantidade: number;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  errors?: string[];
}

export interface PaginatedProducts {
  products: Product[];
  pagination: { page: number; limit: number; total: number; pages: number };
}