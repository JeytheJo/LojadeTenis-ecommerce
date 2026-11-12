import { Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import { Product } from '../models/nosql/Products';
import { addToHistory } from '../config/redis';
import { ok, created, badRequest, notFound } from '../utils/response';

export async function listProducts(req: Request, res: Response): Promise<void> {
  const page     = Math.max(1, Number(req.query.page)  || 1);
  const limit    = Math.min(50, Number(req.query.limit) || 20);
  const skip     = (page - 1) * limit;

  const filter: Record<string, unknown> = { ativo: true };

  if (req.query.categoria) filter.categoria = req.query.categoria;
  if (req.query.marca)     filter.marca     = req.query.marca;
  if (req.query.search) {
    filter.$text = { $search: req.query.search as string };
  }

  const [products, total] = await Promise.all([
    Product.find(filter).skip(skip).limit(limit).lean(),
    Product.countDocuments(filter),
  ]);

  ok(res, {
    products,
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  });
}

export async function getProduct(req: Request, res: Response): Promise<void> {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    badRequest(res, 'ID inválido');
    return;
  }

  const product = await Product.findById(id).lean();
  if (!product) {
    notFound(res, 'Produto não encontrado');
    return;
  }

  // registra no histórico do Redis
  const sessionId = (req.headers['x-session-id'] as string) ?? req.ip ?? 'anonymous';
  await addToHistory(sessionId, id).catch(() => {}); // falha silenciosa

  ok(res, product);
}

export async function createProduct(req: Request, res: Response): Promise<void> {
  const { nome, marca, categoria, cor, tamanho, preco, estoque, imageUrl } = req.body;

  if (!nome || !marca || !categoria || !cor || tamanho == null || preco == null) {
    badRequest(res, 'Campos obrigatórios: nome, marca, categoria, cor, tamanho, preco');
    return;
  }

  const product = await Product.create({
    nome, marca, categoria, cor, tamanho, preco,
    estoque: estoque ?? 0,
    imageUrl,
    ativo: true,
  });

  created(res, product);
}

export async function updateProduct(req: Request, res: Response): Promise<void> {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    badRequest(res, 'ID inválido');
    return;
  }

  const product = await Product.findByIdAndUpdate(
    id,
    { $set: req.body },
    { new: true, runValidators: true },
  ).lean();

  if (!product) {
    notFound(res, 'Produto não encontrado');
    return;
  }

  ok(res, product);
}

// Soft delete: apenas desativa o produto
export async function deleteProduct(req: Request, res: Response): Promise<void> {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    badRequest(res, 'ID inválido');
    return;
  }

  const product = await Product.findByIdAndUpdate(
    id,
    { $set: { ativo: false } },
    { new: true },
  ).lean();

  if (!product) {
    notFound(res, 'Produto não encontrado');
    return;
  }

  ok(res, null, 'Produto removido do catálogo');
}