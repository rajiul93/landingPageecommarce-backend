// validations/rating.validation.ts
import { z } from 'zod';

export const createRatingSchema = z.object({
  body: z.object({
    productId: z.string().min(1, 'Product id is required'),
    rating: z
      .number()
      .min(1, 'Rating must be at least 1')
      .max(5, 'Rating must be at most 5'),
    comment: z.string().max(1000).optional()
  })
});
