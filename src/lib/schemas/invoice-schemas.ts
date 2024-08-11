import { z } from 'zod';

export const CreateInvoiceSchema = z.object({
  amount: z.number(),
  status: z.enum(['PAID', 'PENDING']),
});

export const UpdateInvoiceSchema = z.object({
  entryId: z.string(),
  userId: z.string(),
  amount: z.number(),
  status: z.enum(['PAID', 'PENDING']),
});

export const DeleteInvoiceSchema = z.object({
  entryId: z.string(),
});
