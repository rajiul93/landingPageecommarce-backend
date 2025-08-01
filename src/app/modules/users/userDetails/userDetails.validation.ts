import { z } from "zod";

const createUserDetailsZodSchema = z.object({
  body: z.object({
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

// user.validation.ts
const ProfileUpdateSchema = z.object({
  body: z.object({
    profileImage: z.string().url().optional(),
    address: z
      .object({
        street: z.string().optional(),
        city: z.string().optional(),
        state: z.string().optional(),
        country: z.string().optional(),
        postalCode: z.string().optional(),
        isDefault: z.boolean().optional(),
        _id: z.string().optional(), // For existing address updates
      })
      .optional(),
  }),
});

const AddressSchema = z.object({
  body: z.object({
    street: z.string().min(1, "Street is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    country: z.string().min(1, "Country is required"),
    postalCode: z.string().min(1, "Postal code is required"),
    isDefault: z.boolean().default(false),
  }),
});

export const userZodValidation = {
  createUserDetailsZodSchema,
  ProfileUpdateSchema,
  AddressSchema,
};
