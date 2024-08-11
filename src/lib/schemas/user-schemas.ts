import { z } from 'zod';

export const UpdateUserSchema = z.object({
  role: z.enum(['MANAGER', 'EMPLOYEE', 'OFFICIAL', 'USER', 'ADMIN']),
});
