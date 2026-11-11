import { Request, Response } from 'express';
import { z } from 'zod';
import { supabase } from '../config/supabase';
import { ok, badRequest, unauthorized } from '../utils/response';

const credentialsSchema = z.object({
  email:    z.string().email(),
  password: z.string().min(6),
});

/** POST /api/auth/login */
export async function login(req: Request, res: Response): Promise<void> {
  const parsed = credentialsSchema.safeParse(req.body);
  if (!parsed.success) {
    badRequest(res, 'E-mail e senha são obrigatórios');
    return;
  }

  const { email, password } = parsed.data;
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error || !data.session) {
    unauthorized(res, 'Credenciais inválidas');
    return;
  }

  ok(res, {
    token:      data.session.access_token,
    expires_at: data.session.expires_at,
    user: {
      id:    data.user?.id,
      email: data.user?.email,
    },
  });
}

/** POST /api/auth/logout */
export async function logout(req: Request, res: Response): Promise<void> {
  const token = req.headers.authorization?.split(' ')[1];
  if (token) await supabase.auth.admin.signOut(token);
  ok(res, null, 'Logout realizado com sucesso');
}

/** GET /api/auth/me  (protegida por requireAuth) */
export async function me(req: Request, res: Response): Promise<void> {
  ok(res, {
    id:    req.user?.id,
    email: req.user?.email,
  });
}
