import { z } from 'zod';

export const CreateCustomsSchema = z.object({
  desc: z.string().toUpperCase(),
});

export const UpdateCustomsSchema = z.object({
  desc: z.string().toUpperCase(),
});

export const DeleteCustomsSchema = z.object({
  entryId: z.string(),
});
