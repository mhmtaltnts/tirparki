import { custom, z } from 'zod';

export const ParkTrailerSchema = z.object({
  trailer: z.string().toUpperCase(),
  truck: z.string().toUpperCase(),
  customer: z.string(),
  userId: z.string(),
  createdAt: z.date(),
});

export const ParkEntrySchema = z.object({
  trailer: z.string().toUpperCase(),
  truck: z.string().toUpperCase(),
  customerId: z.string(),
  customs: z.object({
    desc: z.string(),
  }),
  userId: z.string(),
  createdAt: z.date(),
});

export type ParkTrailerType = z.infer<typeof ParkTrailerSchema>;
export type ParkEntryType = z.infer<typeof ParkEntrySchema>;
