"use server";
import { z } from "zod";

import { signIn, signOut } from "../../app/api/auth/[...nextauth]/auth";
import bcrypt from "bcryptjs";

import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSafeActionClient } from "next-safe-action";
import { flattenValidationErrors } from "next-safe-action";

import {
  RegisterUserSchema,
  LoginSchema,
  LoginWithEmailSchema,
} from "@/lib/schemas/auth-schemas";
import prisma from "@/lib/prisma";

const actionClient = createSafeActionClient({
  handleServerError(e) {
    return "Oh no, something went wrong!";
  },
});

export async function register(
  prevState: { error: string },
  formData: FormData,
) {
  const validatedFields = RegisterUserSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return { error: "Kullanıcı oluşturulurken hata oluştu" };
  }

  const name = validatedFields.data.name as string;
  const email = validatedFields.data.email as string;
  const password = validatedFields.data.password as string;

  try {
    const foundUser = await prisma.user.findUnique({ where: { email } });
    if (foundUser) {
      return { error: "Bu eposta daha önce sisteme işlendi." };
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  } catch (error) {
    console.error(error);
    return { error: "Kullanıcı oluşturulurken hata oluştu" };
  }
  redirect("/login");
}
export async function login(
  prevSate: { error: string; success: boolean },
  formData: FormData,
) {
  const validatedFields = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!validatedFields.success) {
    console.error(validatedFields.error);
    return { error: "Şifre veya email hatalı" };
  }

  const email = validatedFields.data.email;
  const password = validatedFields.data.password;

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: true,
      redirectTo: "/dashboard/profile",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CallbackRouteError":
          return { error: "Geçersiz şifre veya email" };
        default:
          return { error: "Kimlik doğrulanamadı!" };
      }
    }
    throw error;
  }
}

type LoginState = {
  error: string;
  success: string;
};

export async function loginWithEmail(
  prevSate: LoginState,
  formData: FormData,
): Promise<LoginState> {
  //const confirmationLink = 'http://localhost:3000/confirm-email';

  //   Check to see if data is valid
  const validatedFields = LoginWithEmailSchema.safeParse({
    email: formData.get("email"),
  });
  if (!validatedFields.success) {
    console.error(validatedFields.error);
    return { error: "Email hatalı", success: "" };
  }

  const email = validatedFields.data.email;

  try {
    await signIn("nodemailer", { email, callbackUrl: "/dashboard/profile" });
    return {
      success: `${email} adresine bağlantı linki gonderildi.`,
      error: "",
    };
  } catch (error) {
    throw error;
  }
}

export const handleLogout = async () => {
  "use server";
  await signOut({ redirectTo: "/", redirect: true });
};

export const handleGoogleLogin = async () => {
  try {
    await signIn("google", {
      redirectTo: "/dashboard/profile",
      redirect: true,
    });
  } catch (error) {
    throw error;
    //return { error: "Hata oluştu" };
  }
};
