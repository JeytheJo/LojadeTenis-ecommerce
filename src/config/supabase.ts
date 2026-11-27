import { createClient } from '@supabase/supabase-js';
import { env } from './env';

export const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);

export const supabaseAdmin = createClient(
  env.SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } },
);


export async function pingSupabase(): Promise<void> {
  const { error } = await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 1 });
  if (error) throw new Error(`Supabase: ${error.message}`);
}


export async function verifyToken(token: string) {
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) {
    throw new Error('Token inválido ou expirado');
  }
  return data.user;
}
