import 'express-async-errors';
import express from 'express';
import cors from 'cors';

import { env } from './config/env';
import { connectMongo } from './config/mongo';
import { connectRedis } from './config/redis';
import { pingSupabase } from './config/supabase';
import { errorHandler } from './middlewares/errorHandler';
import router from './routes';

const app = express();

// ── Middlewares globais ───────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ── Rotas ─────────────────────────────────────────────────────────────────────
app.use('/api', router);

// ── Error handler (deve ficar por último) ─────────────────────────────────────
app.use(errorHandler);

// ── Bootstrap ─────────────────────────────────────────────────────────────────
async function bootstrap(): Promise<void> {
  // MongoDB é obrigatório — a API não sobe sem ele
  await connectMongo();

  // Redis é obrigatório — histórico de vistos não funciona sem ele
  await connectRedis();

  // Supabase: falha gera aviso mas não impede o servidor de subir
  try {
    await pingSupabase();
    console.log('Supabase conectado');
  } catch (err) {
    console.warn('Supabase indisponível:', err instanceof Error ? err.message : err);
    console.warn('    Autenticação de admin não funcionará até a conexão ser restaurada.');
  }

  app.listen(env.PORT, () => {
    console.log(`\n  Servidor: http://localhost:${env.PORT}`);
    console.log(`  Health:   http://localhost:${env.PORT}/api/health`);
    console.log(`  Ambiente: ${env.NODE_ENV}\n`);
  });
}

bootstrap();
