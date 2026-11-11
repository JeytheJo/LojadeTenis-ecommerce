import { User } from '@supabase/supabase-js';

// Estende o tipo do Express Request para incluir o usuário autenticado
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
