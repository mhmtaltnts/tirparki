import { z } from 'zod';

export const CreateExitSchema = z.object({
  truck: z.string(),
});

export const UpdateExitSchema = z.object({
  entryId: z.string(),
  userId: z.string(),
  truck: z.string(),
});

export const DeleteExitSchema = z.object({
  entryId: z.string(),
});
