'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createSafeActionClient } from 'next-safe-action';
import { flattenValidationErrors } from 'next-safe-action';
import {
  CreateCustomerSchema,
  CreateCustomerType,
} from '../schemas/customer-schema';
import prisma from '../prisma';
import { capitalizeFirstLetter } from '../utils';

const actionClient = createSafeActionClient({
  handleReturnedServerError(e) {
    return 'Oh no, something went wrong!';
  },
});

export const createCustomer = actionClient
  .schema(CreateCustomerSchema, {
    handleValidationErrorsShape: (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput: { userId, name, email, tel, address } }) => {
    try {
      const customerToEdit = await prisma.customer.create({
        data: {
          name: capitalizeFirstLetter(name),
          email,
          tel,
          address,
          userId,
        },
      });

      revalidatePath('/dash/customers');
      redirect('/dash/customers');
    } catch (error) {
      console.error(error);

      throw error;
    }
  });

export const updateCustomer = actionClient
  .schema(CreateCustomerSchema, {
    handleValidationErrorsShape: (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput: { userId, name, email, tel, address } }) => {
    try {
      const userToEdit = await prisma.customer.update({
        where: { name },
        data: {
          name: capitalizeFirstLetter(name),
          email,
          tel,
          address,
          userId,
        },
      });

      revalidatePath('/dash/customers');
      redirect('/dash/customers');
    } catch (error) {
      console.error(error);

      throw error;
      //return { error: 'Çıkış yapılamadı' };
    }
  });

export const deleteCustomer = actionClient
  .schema(CreateCustomerSchema, {
    handleValidationErrorsShape: (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput: { name } }) => {
    try {
      await prisma.customer.delete({
        where: { name },
      });

      revalidatePath('/dash/customers');
      redirect('/dash/customers');
    } catch (error) {
      console.error(error);

      throw error;
      //return { error: 'Çıkış yapılamadı' };
    }
  });
