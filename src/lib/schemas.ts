import { z } from 'zod';

export const CreateNoteSchema = z.object({
  userId: z.string(),
  trailer: z.string(),
  truck: z.string(),
  cargo: z.string().optional(),
  customer: z.string().optional(),
  amount: z.coerce.number(),
  status: z.string(),
});

export const ExitParkSchema = z.object({
  userId: z.string(),
  noteId: z.string(),
  truck: z.string(),
});

export const CustomNoteSchema = z.object({
  userId: z.string(),
  noteId: z.string(),
  desc: z.string(),
});

export const NoteSchema = z.object({
  id: z.string(),
  trailer: z.string(),

  entry_truck: z.string(),
  entry_tarih: z.string(),
  entry_cargo: z.string().optional(),
  entry_user: z.string(),

  payment_amount: z.coerce.number(),
  payment_status: z.string(),

  customer: z.string(),

  exit_truck: z.string(),
  exit_tarih: z.string(),
  exit_user: z.string(),

  customs_desc: z.string(),
  customs_tarih: z.string(),
  customs_user: z.string(),
});
