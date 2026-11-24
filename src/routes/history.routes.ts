import { Router, Request, Response } from 'express'
import { redisClient } from '../config/redis' 
import { ProductModel } from '../models/nosql/Products' 

const router = Router()

const MAX_HISTORY = 10

function getVisitorKey(req: Request): string {
  const visitorId = (req.header('X-Visitor-Id') as string) || 'anon'
  return `history:${visitorId}`
}

router.get('/', async (req: Request, res: Response) => {
  try {
    const key = getVisitorKey(req)
    const ids = await redisClient.lRange(key, 0, MAX_HISTORY - 1)

    if (ids.length === 0) {
      return res.json({ success: true, data: [] })
    }

    const produtos = await ProductModel.find({ _id: { $in: ids } }).lean()

    // Mongo não garante a ordem do $in — reordenamos manualmente para
    // bater com a ordem do Redis (mais recente primeiro).
    const porId = new Map(produtos.map((p: any) => [String(p._id), p]))
    const ordenados = ids.map((id) => porId.get(id)).filter(Boolean)

    res.json({ success: true, data: ordenados })
  } catch (err) {
    console.error('Erro ao buscar histórico:', err)
    res.status(500).json({ success: false, message: 'Erro ao buscar histórico' })
  }
})

router.post('/:productId', async (req: Request, res: Response) => {
  try {
    const key = getVisitorKey(req)
    const { productId } = req.params

    await redisClient.lRem(key, 0, productId)
    await redisClient.lPush(key, productId)
    await redisClient.lTrim(key, 0, MAX_HISTORY - 1)

    res.status(204).end()
  } catch (err) {
    console.error('Erro ao registrar visualização:', err)
    res.status(500).json({ success: false, message: 'Erro ao registrar visualização' })
  }
})

// DELETE /api/history
// Limpa o histórico do visitante atual.
router.delete('/', async (req: Request, res: Response) => {
  try {
    const key = getVisitorKey(req)
    await redisClient.del(key)
    res.status(204).end()
  } catch (err) {
    console.error('Erro ao limpar histórico:', err)
    res.status(500).json({ success: false, message: 'Erro ao limpar histórico' })
  }
})

export default router