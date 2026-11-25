// src/config/redis.ts
import { Redis } from '@upstash/redis'

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL as string,
  token: process.env.UPSTASH_REDIS_REST_TOKEN as string,
})

// alias para compatibilidade com history.routes.ts
export const redisClient = redis

export async function connectRedis(): Promise<void> {
  try {
    await redis.ping()
    console.log(':)  Redis (Upstash) conectado')
  } catch (err) {
    console.error('❌  Falha ao conectar Redis:', err)
    throw err
  }
}

const MAX_HISTORY = 10

export async function addToHistory(visitorId: string, productId: string): Promise<void> {
  const key = `history:${visitorId}`
  await redis.lrem(key, 0, productId)
  await redis.lpush(key, productId)
  await redis.ltrim(key, 0, MAX_HISTORY - 1)
}

export async function getHistory(visitorId: string): Promise<string[]> {
  const key = `history:${visitorId}`
  return redis.lrange(key, 0, MAX_HISTORY - 1)
}