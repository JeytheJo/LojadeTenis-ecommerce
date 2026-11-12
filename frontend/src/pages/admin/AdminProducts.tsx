import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../lib/api';
import { Product, ApiResponse, PaginatedProducts } from '../../types';
import { useAuth } from '../../context/AuthContext';

export function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const { signOut } = useAuth();

  function load() {
    api.get<ApiResponse<PaginatedProducts>>('/products?limit=50')
      .then((res) => setProducts(res.data.data?.products ?? []));
  }

  useEffect(load, []);

  async function handleDelete(id: string) {
    if (!confirm('Remover produto do catálogo?')) return;
    await api.delete(`/products/${id}`);
    load();
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Produtos</h1>
        <div className="flex gap-2">
          <Link to="/admin/produtos/novo" className="bg-neutral-900 text-white rounded px-4 py-2">
            + Novo produto
          </Link>
          <button onClick={signOut} className="border rounded px-4 py-2">Sair</button>
        </div>
      </div>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b">
            <th className="py-2">Nome</th><th>Marca</th><th>Preço</th><th>Estoque</th><th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id} className="border-b">
              <td className="py-2">{p.nome}</td>
              <td>{p.marca}</td>
              <td>R$ {p.preco.toFixed(2)}</td>
              <td>{p.estoque}</td>
              <td>
                <button onClick={() => handleDelete(p._id)} className="text-red-500">Remover</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}