import { Router, Request, Response } from 'express';
import { getHistory } from '../config/redis';
import { Product } from '../models/nosql/Products';

const router = Router();

function getSessionId(req: Request): string {
  return req.ip ?? 'anonymous';
}


router.get('/', async (req: Request, res: Response) => {
  const sessionId = getSessionId(req);
  const productIds = await getHistory(sessionId);

  if (!productIds || productIds.length === 0) {
    res.json({ success: true, data: [] });
    return;
  }

  const products = await Product.find({ _id: { $in: productIds } }).lean();
  const productMap = new Map(products.map((p) => [String(p._id), p]));
  const orderedProducts = productIds.map((id) => productMap.get(id)).filter(Boolean);

  res.json({ success: true, data: orderedProducts });
});

router.delete('/', async (req: Request, res: Response) => {
  const sessionId = getSessionId(req);
  const { redis } = await import('../config/redis');
  await redis.del(`history:${sessionId}`);
  res.status(204).end();
});

export default router;