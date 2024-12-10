import { custom, z } from "zod";

export const ParkPublicSchema = z.object({
  trailer: z.string().toUpperCase(),
  truck: z.string().toUpperCase(),
  customer: z.object({
    name: z.string(),
  }),
  createdAt: z.date(),
});

export const ParkEntrySchema = z.object({
  trailer: z.string().toUpperCase(),
  truck: z.string().toUpperCase(),
  customer: z
    .object({
      name: z.string(),
    })
    .optional()
    .transform((val) => (val === undefined ? null : val)),
  customs: z
    .object({
      desc: z.string(),
    })
    .optional()
    .transform((val) => (val === undefined ? null : val)),
  userId: z.string(),
  createdAt: z.date(),
});

export type ParkPublicType = z.infer<typeof ParkPublicSchema>;
export type ParkEntryType = z.infer<typeof ParkEntrySchema>;
