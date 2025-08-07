import { Schema, model } from 'mongoose';
import { IBrand } from './brand.interface';

const brandSchema = new Schema<IBrand>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    logo: { type: String },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const Brand = model<IBrand>('Brand', brandSchema);
