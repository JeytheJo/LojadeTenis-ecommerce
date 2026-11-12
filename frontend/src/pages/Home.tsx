import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { Product, ApiResponse, PaginatedProducts } from '../types';
import { ProductCard } from '../components/ProductCard';

export function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<ApiResponse<PaginatedProducts>>('/products')
      .then((res) => setProducts(res.data.data?.products ?? []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-8 text-center">Carregando catálogo...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Catálogo</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </div>
  );
}