import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../lib/api';

export function AdminNewProduct() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: '', marca: '', categoria: '', cor: '',
    tamanho: '', preco: '', estoque: '', imageUrl: '',
  });
  const [error, setError] = useState('');

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    try {
      await api.post('/products', {
        ...form,
        tamanho: Number(form.tamanho),
        preco: Number(form.preco),
        estoque: Number(form.estoque),
      });
      navigate('/admin/produtos');
    } catch {
      setError('Erro ao cadastrar. Verifique os campos.');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-10 p-6 border rounded-lg flex flex-col gap-3">
      <h1 className="text-xl font-bold mb-2">Novo produto</h1>
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <input placeholder="Nome" value={form.nome} onChange={(e) => update('nome', e.target.value)} className="border rounded p-2" required />
      <input placeholder="Marca" value={form.marca} onChange={(e) => update('marca', e.target.value)} className="border rounded p-2" required />
      <input placeholder="Categoria" value={form.categoria} onChange={(e) => update('categoria', e.target.value)} className="border rounded p-2" required />
      <input placeholder="Cor" value={form.cor} onChange={(e) => update('cor', e.target.value)} className="border rounded p-2" required />
      <input placeholder="Tamanho" type="number" value={form.tamanho} onChange={(e) => update('tamanho', e.target.value)} className="border rounded p-2" required />
      <input placeholder="Preço" type="number" step="0.01" value={form.preco} onChange={(e) => update('preco', e.target.value)} className="border rounded p-2" required />
      <input placeholder="Estoque" type="number" value={form.estoque} onChange={(e) => update('estoque', e.target.value)} className="border rounded p-2" />
      <input placeholder="URL da imagem" value={form.imageUrl} onChange={(e) => update('imageUrl', e.target.value)} className="border rounded p-2" />

      <button type="submit" className="bg-neutral-900 text-white rounded py-2 mt-2">Cadastrar</button>
    </form>
  );
}