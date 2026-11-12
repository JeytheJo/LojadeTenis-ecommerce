import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export function AdminLogin() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    const result = await signIn(email, password);
    if (result.error) {
      setError('Credenciais inválidas');
      return;
    }
    navigate('/admin/produtos');
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-16 p-6 border rounded-lg flex flex-col gap-3">
      <h1 className="text-xl font-bold mb-2">Login Admin</h1>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <input type="email" placeholder="E-mail" value={email}
        onChange={(e) => setEmail(e.target.value)} className="border rounded p-2" required />
      <input type="password" placeholder="Senha" value={password}
        onChange={(e) => setPassword(e.target.value)} className="border rounded p-2" required />
      <button type="submit" className="bg-neutral-900 text-white rounded py-2 mt-2">Entrar</button>
    </form>
  );
}