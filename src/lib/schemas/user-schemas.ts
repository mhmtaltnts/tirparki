import { z } from "zod";

export const UpdateUserSchema = z.object({
  role: z.enum(["MANAGER", "EMPLOYEE", "OFFICIAL", "USER", "ADMIN"]),
});

export const UpdateProfileSchema = z.object({
  name: z.string(),
  address: z.string(),
  phone: z.string(),
});

export const CreateUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  address: z.string(),
  userId: z.string(),
});

export type CreateCustomerType = z.infer<typeof CreateUserSchema>;
