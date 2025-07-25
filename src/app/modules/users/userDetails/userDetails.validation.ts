import { z } from "zod";

export const createUserDetailsZodSchema = z.object({
  body: z.object({
    userId: z.string(),
    phone: z.string().optional(),
    profileImage: z.string().url().optional(),
    addresses: z
      .array(
        z.object({
          label: z.string().optional(),
          street: z.string().optional(),
          city: z.string().optional(),
          state: z.string().optional(),
          postalCode: z.string().optional(),
          country: z.string().optional(),
        })
      )
      .optional(),
    wishlist: z.array(z.string()).optional(),
    cart: z
      .array(
        z.object({
          productId: z.string(),
          quantity: z.number(),
        })
      )
      .optional(),
  }),
});
