import { createClient } from '@supabase/supabase-js';
import { env } from './env';

/** cliente público — validar tokens, login, registro. */
export const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);

/** cliente admin — ignora RLS; use apenas em rotas protegidas do servidor. */
export const supabaseAdmin = createClient(
  env.SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } },
);

/**
 * Verifica se as credenciais do Supabase estão funcionando.
 * Faz uma chamada leve à API de autenticação com a service role key.
 */
export async function pingSupabase(): Promise<void> {
  const { error } = await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 1 });
  if (error) throw new Error(`Supabase: ${error.message}`);
}

/**
 * Valida um JWT emitido pelo Supabase retornando o usuário ou lança erro.
 */
export async function verifyToken(token: string) {
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) {
    throw new Error('Token inválido ou expirado');
  }
  return data.user;
}
