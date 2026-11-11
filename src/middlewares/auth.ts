import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../config/supabase';
import { unauthorized } from '../utils/response';

/**
 * Middleware que valida o JWT emitido pelo Supabase.
 * Em caso de sucesso, popula req.user com o usuário autenticado.
 */
export async function requireAuth(req: Request, res: Response, next: NextFunction): Promise<void> {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    unauthorized(res, 'Token não fornecido');
    return;
  }

  try {
    const token = authHeader.split(' ')[1];
    req.user = await verifyToken(token);
    next();
  } catch {
    unauthorized(res, 'Token inválido ou expirado');
  }
}
