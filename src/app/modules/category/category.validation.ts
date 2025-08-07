import { z } from 'zod';

const createCategorySchema = z.object({
  body: z.object({
    categories: z
      .array(
        z.object({
          title: z.string().min(1, 'Title is required'),
          value: z.string().min(1, 'Value is required'),
        })
      )
      .min(1, 'At least one category item is required'),
  }),
});

export const categoryValidation = {
  createCategorySchema,
};
