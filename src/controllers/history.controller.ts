import { Request, Response } from 'express';
import { getHistory } from '../config/redis';
import { Product } from '../models/nosql/Products';
import { ok } from '../utils/response';

// Retorna os produtos visualizados pelo usuário, com a indentificação via header ...-session-id ou fallback
export async function listHistory(req: Request, res: Response): Promise<void> {
  const sessionId = (req.headers['x-session-id'] as string) ?? req.ip ?? 'anonymous';

  // Busca os IDs dos produtos vistos (já ordenados do mais recente ao mais antigo)
  const productIds = await getHistory(sessionId);

  if (productIds.length === 0) {
    ok(res, []);
    return;
  }

  // Busca os documentos no MongoDB de uma vez só (sem loop)
  const products = await Product.find({
    _id:  { $in: productIds },
    ativo: true,
  }).lean();

  // reordena para manter a ordem do histórico (MongoDB não garante ordem do $in)
  const indexed = new Map(products.map(p => [p._id.toString(), p]));
  const ordered = productIds
    .map(id => indexed.get(id))
    .filter(Boolean);

  ok(res, ordered);
}

/**
 * limpa o histórico do usuário.
 */
export async function clearHistory(req: Request, res: Response): Promise<void> {
  const sessionId = (req.headers['x-session-id'] as string) ?? req.ip ?? 'anonymous';
  const { redis } = await import('../config/redis');
  await redis.del(`history:${sessionId}`);
  ok(res, null, 'Histórico limpo');
}