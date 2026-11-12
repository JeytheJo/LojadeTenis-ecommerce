import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../config/supabase';
import { User } from '@supabase/supabase-js';
import { supabase, supabaseAdmin } from '../config/supabase';

// Extende o tipo Request para carregar o usuário autenticado
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Token não fornecido' });
    return;
  }

  const token = authHeader.slice(7); // remove "Bearer "

  try {
    req.user = await verifyToken(token);
    next();
  } catch {
    res.status(401).json({ error: 'Token inválido ou expirado' });
  }
}