import mongoose from 'mongoose';
import { env } from './env';

// ── Eventos de conexão ────────────────────────────────────────────────────────
mongoose.connection.on('connected',    () => console.log(':)  MongoDB conectado'));
mongoose.connection.on('disconnected', () => console.warn(':/   MongoDB desconectado'));
mongoose.connection.on('error',        (err) => console.error('X  MongoDB erro:', err));

export async function connectMongo(): Promise<void> {
  try {
    await mongoose.connect(env.MONGO_URI, {
      serverSelectionTimeoutMS: 5_000,   // aborta se não achar o servidor em 5s
      socketTimeoutMS: 45_000,
      maxPoolSize: 10,
    });
  } catch (err) {
    console.error('❌  Falha ao conectar MongoDB:', err);
    process.exit(1);
  }
}

export async function disconnectMongo(): Promise<void> {
  await mongoose.disconnect();
}

/** Retorna true se a conexão está ativa. Usado no health check. */
export function isMongoConnected(): boolean {
  return mongoose.connection.readyState === 1;
}

/** Ping real no banco (para health check detalhado). */
export async function pingMongo(): Promise<void> {
  if (!isMongoConnected() || !mongoose.connection.db) {
    throw new Error('MongoDB não está conectado');
  }
  await mongoose.connection.db.admin().ping();
}
