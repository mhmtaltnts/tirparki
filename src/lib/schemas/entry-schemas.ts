import { custom, z } from 'zod';

export const CreateEntrySchema = z.object({
  trailer: z.string().toUpperCase(),
  truck: z.string().toUpperCase(),
  customerId: z.string().optional(),
  cargo: z.string().optional(),
  userId: z.string(),
  amount: z.coerce.number().optional(),
  status: z.string().optional(),
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
