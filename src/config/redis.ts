// src/config/redis.ts
import { Redis } from '@upstash/redis'

export const redisClient = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL as string,
  token: process.env.UPSTASH_REDIS_REST_TOKEN as string,
})

export async function connectRedis(): Promise<void> {
  try {
    await redisClient.ping()
    console.log(':)  Redis (Upstash) conectado')
  } catch (err) {
    console.error('❌  Falha ao conectar Redis:', err)
    throw err
  }
}