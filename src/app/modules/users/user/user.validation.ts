import { z } from 'zod';

export const UserZodSchema = z.object({
  body: z.object({
    email: z.string().email({ message: "Enter a valid email address" }),
    phone: z.string({ error: "Phone number is required" }),
    password: z.string({ error: "Password is required" }),
    name: z.string().min(4, { error: "Name must be at least 4 characters long" }),
  }),
});

export type UserZodType = z.infer<typeof UserZodSchema>;