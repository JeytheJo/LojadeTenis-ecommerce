
export interface PaginationQuery {
  page?: number;
  limit?: number;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
}


export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
}
export interface CartItem {
  productId: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
  imageUrl?: string;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

export interface WhatsAppOrderPayload {
  items: CartItem[];
  customerName?: string;
  total: number;
}
