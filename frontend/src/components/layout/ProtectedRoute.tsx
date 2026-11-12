import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ReactNode } from 'react';

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { session, loading } = useAuth();

  if (loading) return <div className="p-8 text-center">Carregando...</div>;
  if (!session) return <Navigate to="/admin/login" replace />;

  return <>{children}</>;
}