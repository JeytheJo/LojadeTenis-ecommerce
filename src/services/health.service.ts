import { pingMongo, isMongoConnected } from '../config/mongo';
import { pingSupabase } from '../config/supabase';
import { redis } from '../config/redis';

type ServiceStatus = 'ok' | 'error';

interface ServiceCheck {
  status: ServiceStatus;
  message?: string;
}

interface HealthReport {
  status: ServiceStatus;
  uptime: number;
  services: {
    mongodb: ServiceCheck;
    supabase: ServiceCheck;
    redis: ServiceCheck;
  };
}

async function checkMongo(): Promise<ServiceCheck> {
  try {
    await pingMongo();
    return { status: 'ok' };
  } catch (err) {
    return {
      status: 'error',
      message: err instanceof Error ? err.message : 'falha no ping',
    };
  }
}

async function checkSupabaseHealth(): Promise<ServiceCheck> {
  try {
    await pingSupabase();
    return { status: 'ok' };
  } catch (err) {
    return {
      status: 'error',
      message: err instanceof Error ? err.message : 'falha no ping',
    };
  }
}

async function checkRedis(): Promise<ServiceCheck> {
  try {
    const pong = await redis.ping();
    if (pong !== 'PONG') throw new Error('resposta inesperada');
    return { status: 'ok' };
  } catch (err) {
    return {
      status: 'error',
      message: err instanceof Error ? err.message : 'falha no ping',
    };
  }
}

export async function checkServices(): Promise<HealthReport> {
  const [mongodb, supabase, redisResult] = await Promise.all([
    checkMongo(),
    checkSupabaseHealth(),
    checkRedis(),
  ]);

  const allOk = [mongodb, supabase, redisResult].every((s) => s.status === 'ok');

  return {
    status: allOk ? 'ok' : 'error',
    uptime: Math.floor(process.uptime()),
    services: {
      mongodb,
      supabase,
      redis: redisResult,
    },
  };
}

/** Verifica se o MongoDB está conectado sem fazer ping (rápido, sem I/O). */
export function isMongoDB(): boolean {
  return isMongoConnected();
}
