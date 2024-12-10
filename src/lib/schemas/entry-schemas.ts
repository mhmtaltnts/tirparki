import { custom, z } from "zod";

export const CreateEntrySchema = z.object({
  trailer: z.string().toUpperCase(),
  truck: z.string().toUpperCase(),
  customerId: z.string().optional(),
  cargo: z.string().optional(),
  userId: z.string(),
});

export const UpdateEntrySchema = z.object({
  id: z.string(),
  trailer: z.string().toUpperCase(),
  truck: z.string().toUpperCase(),
  customerId: z.string().optional(),
  cargo: z.string(),
  desc: z.string().optional(),
  userId: z.string(),
  amount: z.coerce.number().optional(),
  status: z.string(),
});

export const DeleteEntrySchema = z.object({
  id: z.string(),
});

export const ParkEntrySchema = z.object({
  trailer: z.string().toUpperCase(),
  truck: z.string().toUpperCase(),
  cargo: z
    .string()
    .optional()
    .transform((val) => (val === undefined ? null : val)),
  createdAt: z.date(),
  customer: z
    .object({
      name: z
        .string()
        .optional()
        .transform((val) => (val === undefined ? null : val)),
    })
    .optional()
    .transform((val) => (val === undefined ? null : val)),
  customs: z
    .object({
      desc: z.string(),
    })
    .optional()
    .transform((val) => (val === undefined ? null : val)),
  invoice: z
    .object({
      status: z.enum(["PAID", "PENDING"]),
    })
    .optional()
    .transform((val) => (val === undefined ? null : val)),
});

export type ParkEntryT = z.infer<typeof ParkEntrySchema>;
