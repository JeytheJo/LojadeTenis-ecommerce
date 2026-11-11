import { User } from '@supabase/supabase-js';

// estende o tipo do Express Request para incluir o usuário autenticado
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
