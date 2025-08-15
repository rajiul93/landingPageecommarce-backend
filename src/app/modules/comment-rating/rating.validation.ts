// validations/rating.validation.ts

import { z } from 'zod';

export const createRatingSchema = z.object({
  body: z.object({
    rating: z
      .number({
        error: 'Rating must be a number'
      })
      .int('Rating must be an integer')
      .min(1, 'Rating must be at least 1')
      .max(5, 'Rating must be at most 5')
      .optional(),
    comment: z.string().max(1000).optional()
  })
});

