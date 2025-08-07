import { z } from 'zod';

const createBrandSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Brand name is required"),
    logo: z.string().url().optional(),
    isActive: z.boolean().optional()
  })
});

export const brandValidation = {
  createBrandSchema
};
