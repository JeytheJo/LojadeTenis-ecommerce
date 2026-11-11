import { Router } from 'express';
import { requireAuth } from '../middlewares/auth';
import {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/product.controller';

const router = Router();

// ── Rotas públicas (vitrine do cliente) ───────────────────────────────────────
router.get('/',    listProducts);   // GET  /api/products?page=1&limit=20&category=x
router.get('/:id', getProduct);     // GET  /api/products/:id

// ── Rotas de admin (exigem JWT do Supabase) ───────────────────────────────────
router.post('/',    requireAuth, createProduct);   // POST   /api/products
router.patch('/:id', requireAuth, updateProduct);  // PATCH  /api/products/:id
router.delete('/:id', requireAuth, deleteProduct); // DELETE /api/products/:id

export default router;
