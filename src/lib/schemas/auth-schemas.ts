import { z } from "zod";

export const RegisterUserSchema = z.object({
  name: z.string().min(2, "Minimum 2 karakter gereklidir"),
  email: z.string().email("Lütfen geçerli bir e-posta adresi giriniz"),
  password: z.string().min(5, "Minimum 5 karakter gereklidir"),
});
// Schema for selecting a user - can be used to validate API responses

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5, {
    message: "Minimum 5 karakter gereklidir",
  }),
});

export const LoginWithEmailSchema = z.object({
  email: z.string().email({
    message: "lütfen Eposta adresinizi giriniz",
  }),
});

export type RegisterUserType = z.infer<typeof RegisterUserSchema>;
export type LoginType = z.infer<typeof LoginSchema>;
