import { z } from 'zod';

const createBrandSchema = z.object({
  body: z.object({
    title:z.string().min(4, "Title is required"),
    value:z.string().min(4, "Value is required")
  })
});

export const brandValidation = {
  createBrandSchema
};
