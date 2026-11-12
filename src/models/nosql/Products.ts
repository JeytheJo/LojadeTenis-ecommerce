import { Schema, model, Document } from 'mongoose';

export interface IProduct extends Document {
  nome:      string;
  marca:     string;
  categoria: string;
  cor:       string;
  tamanho:   number;
  preco:     number;
  estoque:   number;
  imageUrl?: string;
  ativo:     boolean;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    nome:      { type: String, required: true, trim: true },
    marca:     { type: String, required: true, trim: true },
    categoria: { type: String, required: true, trim: true },
    cor:       { type: String, required: true, trim: true },
    tamanho:   { type: Number, required: true },
    preco:     { type: Number, required: true, min: 0 },
    estoque:   { type: Number, required: true, min: 0, default: 0 },
    imageUrl:  { type: String },
    ativo:     { type: Boolean, default: true },
  },
  { timestamps: true },
);

// indices para buscas comuns no catálogo
productSchema.index({ categoria: 1 });
productSchema.index({ marca: 1 });
productSchema.index({ ativo: 1 });
productSchema.index({ nome: 'text', marca: 'text' }); // busca full-text

export const Product = model<IProduct>('Product', productSchema, 'produtos');