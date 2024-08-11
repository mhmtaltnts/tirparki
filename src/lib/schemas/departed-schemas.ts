import { z } from 'zod';

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

export const DeleteDepartedSchema = z.object({
  id: z.string(),
});
