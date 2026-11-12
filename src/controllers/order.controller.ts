import { Request, Response } from 'express';
import { env } from '../config/env';
import { buildWhatsAppLink } from '../utils/whatsapp';
import { badRequest, ok } from '../utils/response';

export async function generateCheckoutLink(req: Request, res: Response): Promise<void> {
  const { items } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    badRequest(res, 'Carrinho vazio ou inválido');
    return;
  }

  const { message, url } = buildWhatsAppLink(env.WHATSAPP_PHONE, items);
  ok(res, { message, url });
}