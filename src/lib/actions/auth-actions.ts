'use server';
import { z } from 'zod';

import { signIn, signOut } from '../../app/api/auth/[...nextauth]/auth';
import bcrypt from 'bcryptjs';

import { AuthError } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createSafeActionClient } from 'next-safe-action';
import { flattenValidationErrors } from 'next-safe-action';

import { RegisterUserSchema, LoginSchema } from '@/lib/schemas/auth-schemas';
import prisma from '@/lib/prisma';

const actionClient = createSafeActionClient({
  handleReturnedServerError(e) {
    return 'Oh no, something went wrong!';
  },
});

export async function register(
  prevState: { error: string },
  formData: FormData
) {
  const validatedFields = RegisterUserSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return { error: 'Kullanıcı oluşturulurken hata oluştu' };
  }

  const email = validatedFields.data.email;
  const name = validatedFields.data.name;
  const password = validatedFields.data.password;

  try {
    const user = await prisma.user.findUnique({ where: { email: email } });

    if (user) {
      return { error: 'Bu eposta daha önce sisteme işlendi.' };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });
  } catch (error) {
    console.error(error);
    return { error: 'Kullanıcı oluşturulurken hata oluştu' };
  }
  redirect('/login');
}

export async function login(
  prevSate: { error: string; success: boolean },
  formData: FormData
) {
  const validatedFields = LoginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });
  if (!validatedFields.success) {
    console.error(validatedFields.error);
    return { error: 'Şifre veya email hatalı' };
  }

  const email = validatedFields.data.email;
  const password = validatedFields.data.password;

  try {
    await signIn('credentials', {
      email,
      password,
      redirect: true,
      redirectTo: '/park',
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CallbackRouteError':
          return { error: 'Geçersiz şifre veya email' };
        default:
          return { error: 'Kimlik doğrulanamadı!' };
      }
    }
    throw error;
  }
}

export const handleLogout = async () => {
  'use server';
  await signOut({ redirectTo: '/', redirect: true });
};

export const handleGoogleLogin = async () => {
  'use server';
  await signIn('google', { redirectTo: '/park', redirect: true });
};
