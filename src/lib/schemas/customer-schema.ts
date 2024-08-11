import { z } from 'zod';

export const CreateCustomerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  tel: z.string(),
  address: z.string(),
  userId: z.string(),
});

export type CreateCustomerType = z.infer<typeof CreateCustomerSchema>;
