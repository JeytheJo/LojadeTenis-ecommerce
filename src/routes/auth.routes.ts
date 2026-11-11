import { Router } from 'express';
import { requireAuth } from '../middlewares/auth';
import { login, logout, me } from '../controllers/auth.controller';

const router = Router();

router.post('/login',  login);              // POST /api/auth/login
router.post('/logout', requireAuth, logout); // POST /api/auth/logout
router.get('/me',      requireAuth, me);     // GET  /api/auth/me

export default router;
