import { z } from "zod";

export const UpdateDepartedSchema = z.object({
  id: z.string(),
  trailer: z.string().toUpperCase(),
  truck: z.string().toUpperCase(),
  customerId: z.string(),
  cargo: z.string(),
  amount: z.number(),
  status: z.string(),
  userId: z.string(),
});

export const DepartedSchema = z.object({
  id: z.string(),
  trailer: z.string().toUpperCase(),
  truck: z.string().toUpperCase(),
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
  invoice: z
    .object({
      status: z.enum(["PAID", "PENDING"]),
    })
    .optional()
    .transform((val) => (val === undefined ? null : val)),
  customs: z
    .object({
      desc: z.string(),
    })
    .optional()
    .transform((val) => (val === undefined ? null : val)),
  exit: z.object({
    truck: z.string(),
    createdAt: z.date(),
  }).optional()
  .transform((val) => (val === undefined ? null : val)),
});

export const DeleteDepartedSchema = z.object({
  id: z.string(),
});

export type DepartedSchemaT = z.infer<typeof DepartedSchema>;
