import { Router } from 'express';
import { generateCheckoutLink } from '../controllers/order.controller';

const router = Router();
router.post('/whatsapp-link', generateCheckoutLink);

export default router;