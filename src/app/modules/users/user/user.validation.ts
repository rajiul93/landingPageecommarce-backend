import { z } from 'zod';

export const UserZodSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
    name: z.string().min(4, 'length min 4'),
  }),
});

export type UserZodType = z.infer<typeof UserZodSchema>;
