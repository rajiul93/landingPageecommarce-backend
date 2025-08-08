import { z } from "zod";

const createCategorySchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    value: z.string().min(1, "Value is required"),
  }),
});

export const categoryValidation = {
  createCategorySchema,
};
