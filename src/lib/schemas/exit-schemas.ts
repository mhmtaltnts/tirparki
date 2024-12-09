import { z } from "zod";

export const CreateExitSchema = z.object({
  truck: z.string(),
  amount: z.coerce.number(),
  status: z.enum(["PAID", "PENDING"]),
});

export const UpdateExitSchema = z.object({
  entryId: z.string(),
  userId: z.string(),
  truck: z.string(),
});

export const DeleteExitSchema = z.object({
  entryId: z.string(),
});
