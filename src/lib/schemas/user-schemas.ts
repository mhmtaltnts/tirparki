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

export const UserDataSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  image: z.string(),
  role: z.enum(["MANAGER", "EMPLOYEE", "OFFICIAL", "USER", "ADMIN"]),
  address: z.string(),
});

export type CreateCustomerType = z.infer<typeof CreateUserSchema>;
export type UserDataT = z.infer<typeof UserDataSchema>;
