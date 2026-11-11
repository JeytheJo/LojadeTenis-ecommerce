import { Request, Response } from 'express';
import { z } from 'zod';
import * as repo from '../repositories/product.repository';
import { ok, created, noContent, badRequest, notFound } from '../utils/response';

// ── Schemas de validação ──────────────────────────────────────────────────────

const productSchema = z.object({
  name:        z.string().min(2).max(100),
  description: z.string().default(''),
  price:       z.number().positive(),
  images:      z.array(z.string().url()).default([]),
  category:    z.string().min(1),
  brand:       z.string().min(1),
  sizes:       z.array(z.string()).default([]),
  stock:       z.number().int().min(0).default(0),
  isActive:    z.boolean().default(true),
});

const updateSchema = productSchema.partial();

// ── Handlers ──────────────────────────────────────────────────────────────────

/** GET /api/products */
export async function listProducts(req: Request, res: Response): Promise<void> {
  const page  = Number(req.query.page)  || 1;
  const limit = Number(req.query.limit) || 20;

  const filters = {
    category: req.query.category as string | undefined,
    brand:    req.query.brand    as string | undefined,
    search:   req.query.search   as string | undefined,
    isActive: true,
  };

  const result = await repo.findAllProducts(filters, { page, limit });
  ok(res, result);
}

/** GET /api/products/:id */
export async function getProduct(req: Request, res: Response): Promise<void> {
  const product = await repo.findProductById(req.params.id);
  if (!product) { notFound(res, 'Produto não encontrado'); return; }
  ok(res, product);
}

/** POST /api/products  (admin) */
export async function createProduct(req: Request, res: Response): Promise<void> {
  const parsed = productSchema.safeParse(req.body);
  if (!parsed.success) {
    badRequest(res, 'Dados inválidos', parsed.error.errors.map((e) => e.message));
    return;
  }
  const product = await repo.createProduct(parsed.data as Parameters<typeof repo.createProduct>[0]);
  created(res, product, 'Produto criado com sucesso');
}

/** PATCH /api/products/:id  (admin) */
export async function updateProduct(req: Request, res: Response): Promise<void> {
  const parsed = updateSchema.safeParse(req.body);
  if (!parsed.success) {
    badRequest(res, 'Dados inválidos', parsed.error.errors.map((e) => e.message));
    return;
  }
  const product = await repo.updateProduct(req.params.id, parsed.data);
  if (!product) { notFound(res, 'Produto não encontrado'); return; }
  ok(res, product, 'Produto atualizado');
}

/** DELETE /api/products/:id  (admin — soft delete) */
export async function deleteProduct(req: Request, res: Response): Promise<void> {
  const product = await repo.deactivateProduct(req.params.id);
  if (!product) { notFound(res, 'Produto não encontrado'); return; }
  noContent(res);
}
