import { FilterQuery, Types } from 'mongoose';
import { Product, IProduct } from '../models/nosql/Product';
import { PaginationQuery, PaginatedResult } from '../types';

export interface ProductFilters {
  category?: string;
  brand?: string;
  search?: string;
  isActive?: boolean;
}

// ── Leitura ───────────────────────────────────────────────────────────────────

export async function findAllProducts(
  filters: ProductFilters = {},
  pagination: PaginationQuery = {},
): Promise<PaginatedResult<IProduct>> {
  const { page = 1, limit = 20 } = pagination;
  const skip = (page - 1) * limit;

  const query: FilterQuery<IProduct> = { isActive: filters.isActive ?? true };

  if (filters.category) query.category = filters.category;
  if (filters.brand)    query.brand = filters.brand;
  if (filters.search)   query.$text = { $search: filters.search };

  const [data, total] = await Promise.all([
    Product.find(query).skip(skip).limit(limit).lean(),
    Product.countDocuments(query),
  ]);

  return {
    data: data as IProduct[],
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
}

export async function findProductById(id: string): Promise<IProduct | null> {
  if (!Types.ObjectId.isValid(id)) return null;
  return Product.findById(id).lean() as Promise<IProduct | null>;
}

// ── Escrita ───────────────────────────────────────────────────────────────────

export async function createProduct(
  data: Omit<IProduct, '_id' | 'createdAt' | 'updatedAt'>,
): Promise<IProduct> {
  const product = new Product(data);
  return product.save();
}

export async function updateProduct(
  id: string,
  data: Partial<Omit<IProduct, '_id' | 'createdAt' | 'updatedAt'>>,
): Promise<IProduct | null> {
  if (!Types.ObjectId.isValid(id)) return null;
  return Product.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true }).lean() as Promise<IProduct | null>;
}

export async function deleteProduct(id: string): Promise<boolean> {
  if (!Types.ObjectId.isValid(id)) return false;
  const result = await Product.findByIdAndDelete(id);
  return result !== null;
}

/** Soft-delete: só marca como inativo. */
export async function deactivateProduct(id: string): Promise<IProduct | null> {
  return updateProduct(id, { isActive: false });
}
