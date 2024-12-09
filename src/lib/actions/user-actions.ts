"use server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSafeActionClient } from "next-safe-action";
import { flattenValidationErrors } from "next-safe-action";

import {
  UpdateUserSchema,
  UpdateProfileSchema,
} from "@/lib/schemas/user-schemas";
import prisma from "@/lib/prisma";

const actionClient = createSafeActionClient({
  handleServerError(e) {
    return "Oh no, something went wrong!";
  },
});

/* export const updateUser = actionClient
  .schema(UpdateUserSchema, {
    handleValidationErrorsShape: (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput: { email, role } }) => {
    try {
      await prisma.user.update({
        where: { email },
        data: {
          role,
        },
      });
      revalidatePath('dash/users');
    } catch (error) {
      console.error(error);

      throw error;
      //return { error: 'Çıkış yapılamadı' };
    }
    return 'Kullanıcı değiştirildi...';
  });
 */

export async function updateUser(
  prevState: { userId: string; role: string; message: string; error: string },
  formData: FormData,
) {
  const role = formData.get("role") as
    | "USER"
    | "ADMIN"
    | "MANAGER"
    | "EMPLOYEE"
    | "OFFICIAL";
  const userId = prevState.userId;
  const validatedFields = UpdateUserSchema.safeParse({
    role: formData.get("role"),
  });

  if (!validatedFields.success) {
    return {
      error: "Kullanıcı değiştirilemedi, Şema hatası",
    };
  }

  try {
    await prisma.user.update({ where: { id: userId }, data: { role } });

    revalidatePath("dashboard/users");
    return { userId, role, message: "Kullanıcı değiştirildi...", error: "" };
  } catch (error) {
    console.log(error);
    return { error: "Kullanıcı değiştirilemedi" };
  }
}
type UpdateMeType = {
  userId: string;
  email: string;
  message: string;
  error: string;
};

export async function updateProfile(
  prevState: UpdateMeType,
  formData: FormData,
): Promise<UpdateMeType> {
  const userId = prevState.userId;
  const email = prevState.email;
  const validatedFields = UpdateProfileSchema.safeParse({
    name: formData.get("name"),
    address: formData.get("address"),
    phone: formData.get("phone"),
  });

  if (!validatedFields.success) {
    return {
      userId,
      email,
      error: "Kullanıcı değiştirilemedi, Şema hatası",
      message: "",
    };
  }

  try {
    await prisma.user.update({
      where: { id: userId },
      data: { ...validatedFields.data },
    });

    revalidatePath("dashboard/users");
    return {
      userId,
      email,
      message: "Kullanıcı bilgileriniz güncellendi.",
      error: "",
    };
  } catch (error) {
    console.log(error);
    return { userId, email, error: "Kullanıcı değiştirilemedi", message: "" };
  }
}

export async function deleteUser(
  prevState: { userId: string; error: string },
  formData: FormData,
) {
  const userId = formData.get("userId") as string;
  try {
    await prisma.user.delete({ where: { id: userId } });
    revalidatePath("dashboard/users");
    return { userId, error: "" };
  } catch (error) {
    console.log(error);
    return { error: "Kullanıcı silinemedi" };
  }
}
