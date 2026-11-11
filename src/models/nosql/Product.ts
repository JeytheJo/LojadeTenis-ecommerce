import { Schema, model, Document, Types } from 'mongoose';

export interface IProduct extends Document {
  _id: Types.ObjectId;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  brand: string;
  sizes: string[];          // ex.: ['38', '39', '40', '41', '42']
  stock: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name:        { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    price:       { type: Number, required: true, min: 0 },
    images:      { type: [String], default: [] },
    category:    { type: String, required: true },
    brand:       { type: String, required: true },
    sizes:       { type: [String], default: [] },
    stock:       { type: Number, default: 0, min: 0 },
    isActive:    { type: Boolean, default: true },
  },
  { timestamps: true },
);

// Índices para busca rápida
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ category: 1 });
productSchema.index({ brand: 1 });
productSchema.index({ isActive: 1 });

export const Product = model<IProduct>('Product', productSchema);
