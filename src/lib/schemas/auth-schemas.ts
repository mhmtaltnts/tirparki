import { z } from 'zod';

export const RegisterUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email(),
  password: z.string().min(5, {
    message: 'Minimum 5 karakter gereklidir',
  }),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5, {
    message: 'Minimum 5 karakter gereklidir',
  }),
});

export type RegisterUserType = z.infer<typeof RegisterUserSchema>;
export type LoginType = z.infer<typeof LoginSchema>;