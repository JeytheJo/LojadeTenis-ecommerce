import { Router } from 'express';
import { checkServices } from '../services/health.service';
import productRoutes from './product.routes';
import authRoutes    from './auth.routes';

const router = Router();

/** GET /api/health — status de MongoDB, Supabase e Redis */
router.get('/health', async (_req, res) => {
  const report = await checkServices();
  res.status(report.status === 'ok' ? 200 : 503).json({ project: 'Kicks&Co', ...report });
});

router.use('/auth',     authRoutes);
router.use('/products', productRoutes);

// Futuras rotas:
// router.use('/cart',    cartRoutes);
// router.use('/history', historyRoutes);

export default router;
