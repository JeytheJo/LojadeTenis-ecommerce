import Redis from 'ioredis';
import { env } from './env';

export const redis = new Redis(env.REDIS_URL, {
  lazyConnect: true,
  maxRetriesPerRequest: 3,
});

redis.on('connect', () => console.log(':)  Redis conectado'));
redis.on('error', (err) => console.error('X  Redis erro:', err));

export async function connectRedis(): Promise<void> {
  await redis.connect();
}

// ── Helpers de cache ──────────────────────────────────────────────────────────

/** Salva com TTL (segundos). */
export async function cacheSet(key: string, value: unknown, ttlSeconds = 300): Promise<void> {
  await redis.set(key, JSON.stringify(value), 'EX', ttlSeconds);
}

/** Lê e faz parse automático. Retorna null se não existir. */
export async function cacheGet<T>(key: string): Promise<T | null> {
  const raw = await redis.get(key);
  return raw ? (JSON.parse(raw) as T) : null;
}

/** Invalida uma chave. */
export async function cacheDel(key: string): Promise<void> {
  await redis.del(key);
}

// ── Histórico de produtos vistos (lista circular) ─────────────────────────────
const HISTORY_TTL = 60 * 60 * 24; // 24h
const HISTORY_MAX = 20;

export async function addToHistory(sessionId: string, productId: string): Promise<void> {
  const key = `history:${sessionId}`;
  await redis.lrem(key, 0, productId);       // remove duplicata
  await redis.lpush(key, productId);         // insere no início
  await redis.ltrim(key, 0, HISTORY_MAX - 1); // mantém só os últimos N
  await redis.expire(key, HISTORY_TTL);
}

export async function getHistory(sessionId: string): Promise<string[]> {
  return redis.lrange(`history:${sessionId}`, 0, -1);
}
