// validations/product.validation.ts
import { z } from 'zod';

const sizeZ = z.object({
  size: z.enum(['XS','S','M','L','XL','XXL']),
  stock: z.number().min(0).optional(),
  quantitySold: z.number().min(0).optional(),
  sku: z.string().optional(),
  price: z.number().optional()
});

const imageZ = z.object({
  url: z.string().url(),
  alt: z.string().optional()
});

const colorZ = z.object({
  name: z.string().min(1),
  hexCode: z.string().optional(),
  images: z.array(imageZ).optional(),
  sizes: z.array(sizeZ).optional()
});

export const createProductSchema = z.object({
  body: z.object({
    // userId will be assigned from req.user — not from body
    title: z.string().min(1),
    slug: z.string().min(1),
    shortDescription: z.string().optional(),
    description: z.string().min(1),
    category: z.array(z.string()).min(1),
    brand: z.string().optional(),
    basePrice: z.number().nonnegative(),
    discountPrice: z.number().nonnegative().optional(),
    currency: z.string().optional(),
    colors: z.array(colorZ).optional(),
    isActive: z.boolean().optional(),
    isDeleted: z.boolean().optional()
  })
});
