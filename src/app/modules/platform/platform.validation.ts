import { z } from "zod";

export const createImageSchema = z.object({
  body: z.object({
    siteName: z.string({
      error: "Site name is required",
    }),

    logo: z.object({
      url: z.string({
        error: "Logo URL is required",
      }),
      alt: z.string().optional(),
    }),

    favIcon: z.object({
      url: z.string({
        error: "FavIcon URL is required",
      }),
      alt: z.string().optional(),
    }),
  }),
});
