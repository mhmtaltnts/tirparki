"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSafeActionClient } from "next-safe-action";
import { flattenValidationErrors } from "next-safe-action";
import { CreateUserSchema, CreateCustomerType } from "../schemas/user-schemas";
import prisma from "../prisma";
import { capitalizeFirstLetter } from "../utils";

const actionClient = createSafeActionClient({
  handleServerError(e) {
    return "Oh no, something went wrong!";
  },
});

export const createCustomer = actionClient
  .schema(CreateUserSchema, {
    handleValidationErrorsShape: (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput: { name, email, phone, address } }) => {
    try {
      const customerToEdit = await prisma.user.create({
        data: {
          name: capitalizeFirstLetter(name),
          email,
          phone,
          address,
        },
      });

      revalidatePath("/dashboard/customers");
      redirect("/dashboard/customers");
    } catch (error) {
      console.error(error);

      throw error;
    }
  });

export const updateCustomer = actionClient
  .schema(CreateUserSchema, {
    handleValidationErrorsShape: (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput: { userId, name, email, phone, address } }) => {
    try {
      const userToEdit = await prisma.user.update({
        where: { email },
        data: {
          name: capitalizeFirstLetter(name),
          email,
          phone,
          address,
        },
      });

      revalidatePath("/dashboard/customers");
      redirect("/dash/customers");
    } catch (error) {
      console.error(error);

      throw error;
      //return { error: 'Çıkış yapılamadı' };
    }
  });

export const deleteCustomer = actionClient
  .schema(CreateUserSchema, {
    handleValidationErrorsShape: (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput: { email } }) => {
    try {
      await prisma.user.delete({
        where: { email },
      });

      revalidatePath("/dashboard/customers");
      redirect("/dashboard/customers");
    } catch (error) {
      console.error(error);

      throw error;
      //return { error: 'Çıkış yapılamadı' };
    }
  });
