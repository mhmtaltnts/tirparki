"use server";
import { z } from "zod";

import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSafeActionClient } from "next-safe-action";
import { flattenValidationErrors } from "next-safe-action";

import { CreateNoteSchema, ExitParkSchema, CustomNoteSchema } from "./schemas";
import prisma from "./prisma";

const BASE_URL = "http://localhost:3000";

/*const actionClient = createSafeActionClient({
  handleReturnedServerError(e) {
    return 'Oh no, something went wrong!';
  },
});

 export const register = actionClient
  .schema(CreateUserSchema, {
    handleValidationErrorsShape: (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput: { name, email, password, role } }) => {
    try {
      const user = await prisma.user.findUnique({ where: { email: email } });

      if (user) {
        return { message: 'Bu eposta daha önce sisteme işlendi.' };
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = await prisma.user.create({
        data: {
          name: name,
          email: email,
          password: hashedPassword,
          role: role,
        },
      });
    } catch (error) {
      throw new Error('Kullanıcı oluşturulurken hata oluştu');
    }
    redirect('/login');
  }); */

/* export const register = async (previousState, formData) => {
  const { name, email, password, passwordConfirm } =
    Object.fromEntries(formData);

  if (password !== passwordConfirm) {
    return { error: 'Şifreler uyuşmuyor' };
  }

  try {
    const user = await prisma.user.findUnique({ where: { email: email } });

    if (user) {
      return { error: 'Bu eposta daha önce sisteme işlendi.' };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    console.log('saved to db');

    return { success: true };
  } catch (err) {
    console.log(err);
    return { error: 'Kayıt oluşturulurken hata oldu!' };
  }
}; */

/* export const login = actionClient
  .schema(LoginSchema, {
    handleValidationErrorsShape: (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput: { email, password } }) => {
    try {
      await signIn('credentials', {
        email,
        password,
        redirectTo: '/park',
        redirect: true,
      });
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CallbackRouteError':
            return { error: 'Geçersiz şifre veya email' };
          default:
            return { error: 'Kimlik doğrulanamadı' };
        }
      }
      throw error;
    }
    redirect('/park');
  }); */

/* export const login = async (prevState, formData) => {
  const { email, password } = Object.fromEntries(formData);
  try {
    await signIn('credentials', { email, password });
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CallbackRouteError':
          return { error: 'Geçersiz şifre veya email' };
        default:
          return { error: 'Kimlik doğrulanamadı' };
      }
    }
    throw error;
  }
}; */

/* export const handleLogout = async () => {
  'use server';
  await signOut({ redirectTo: '/', redirect: true });
};

export const handleGoogleLogin = async () => {
  'use server';
  await signIn('google', { redirectTo: '/park', redirect: true });
}; */
/* export const handleGithubLogin = async () => {
  'use server';
  await signIn('github');
};
 */

/* export const createUser = actionClient
  .schema(CreateUserSchema, {
    handleValidationErrorsShape: (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput: { name, email, password, image, role } }) => {
    try {
      const user = await prisma.user.findUnique({ where: { email: email } });

      if (user) {
        return { message: 'Bu eposta daha önce sisteme işlendi.' };
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = await prisma.user.create({
        data: {
          name: name,
          email: email,
          password: hashedPassword,
          image: image,
          role: role,
        },
      });

      revalidatePath('/users');
    } catch (error) {
      throw new Error('Kullanıcı oluşturulurken hata oluştu');
    }
    redirect('/admin/users');
  });

export const updateUser = actionClient
  .schema(UpdateUserSchema, {
    handleValidationErrorsShape: (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput: { userId, name, password, role } }) => {
    try {
      const salt = await bcrypt.genSalt(10);

      const hashedPasword = await bcrypt.hash(password, salt);

      const userToEdit = await prisma.user.update({
        where: { id: userId },
        data: {
          name: name,
          role: role,
          password: hashedPasword,
        },
      });

      revalidatePath('admin/users');
    } catch (error) {
      console.error(error);

      throw error;
      //return { error: 'Çıkış yapılamadı' };
    }
    return { message: 'User Updated! 🎉' };
  });

export const deleteUser = async (userId) => {
  //const { id } = Object.fromEntries(formData);

  try {
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });
    console.log('deleted from db');
  } catch (err) {
    console.log(err);
    return { error: 'Something went wrong!' };
  }
  revalidatePath('/users');
}; */

/* export const createentry = async (userId, formData) => {
  // const title = formData.get("title");
  // const desc = formData.get("desc");
  // const slug = formData.get("slug");

  const { truck, trailer, customer, cargo } = Object.fromEntries(formData);
  //const tarih = Date.now();

  try {
    const newNote = prisma.entry.create({
      data: {
        trailer,
        truck,
        cargo,
        user: userId,
        customer,
      },
    });

    console.log('saved to db');
    revalidatePath('/admin/notes');
  } catch (err) {
    console.log(err);
    return { error: 'Something went wrong!' };
  }
  redirect('/admin/park');
};

export const updateentry = async (prevState, formData) => {
  const { userId, entryId, trailer, truck, customer, cargo } =
    Object.fromEntries(formData);
  try {
    const note = await prisma.entry.update({
      where: { id: entryId },
      data: { trailer, truck, cargo, user: userId, customer },
    });
    if (!note) {
      return { error: 'Kayıt bulunamadı' };
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
  redirect('/admin/notes');
};

export const deleteentry = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    await prisma.entry.delete(id);
    console.log('deleted from db');
    revalidatePath('/users');
  } catch (err) {
    console.log(err);
    return { error: 'Something went wrong!' };
  }
};
 */

/* export const updateUser = async (prevState, formData) => {
  const { userId, name, password, role } = formData;
  //const { name, email, image, password, role } = Object.fromEntries(formData);
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await prisma.user.update({
      where: { id: userId },
      data: {
        name: name,
        password: hashedPassword,
        role: role,
      },
    });

    console.log('saved to db');

    //return { success: 'Kullanıcı değiştirildi' };
  } catch (err) {
    console.log(err);
    return { error: 'Kayıt oluşturulurken hata oldu!' };
  }
  revalidatePath('/users');
  redirect('/admin/users');
}; */
