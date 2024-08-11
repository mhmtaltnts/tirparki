'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createSafeActionClient } from 'next-safe-action';
import { flattenValidationErrors } from 'next-safe-action';

import {
  UpdateDepartedSchema,
  DeleteDepartedSchema,
} from '@/lib/schemas/departed-schemas';
import prisma from '@/lib/prisma';

const BASE_URL = 'http://localhost:3000';

const actionClient = createSafeActionClient({
  handleReturnedServerError(e) {
    return 'Oh no, something went wrong!';
  },
});

export const updateEntry = actionClient
  .schema(UpdateDepartedSchema, {
    handleValidationErrorsShape: (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(
    async ({
      parsedInput: {
        id,
        userId,
        trailer,
        truck,
        customerId,
        cargo,
        amount,
        status,
      },
    }) => {
      try {
        const entryToEdit = await prisma.entry.update({
          where: { id },
          data: {
            trailer,
            truck,
            customerId,
            cargo,
            userId,
            invoice: {
              update: {
                amount,
                status,
                userId,
              },
            },
          },
        });

        revalidatePath('entry');
      } catch (error) {
        console.error(error);

        throw error;
        //return { error: 'Çıkış yapılamadı' };
      }
      return { message: 'Park Girişi Yapıldı ! 🎉' };
    }
  );

export const deleteEntry = actionClient
  .schema(DeleteDepartedSchema, {
    handleValidationErrorsShape: (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput: { id } }) => {
    try {
      const userToEdit = await prisma.entry.delete({
        where: { id },
      });

      revalidatePath('entry');
    } catch (error) {
      console.error(error);

      throw error;
      //return { error: 'Çıkış yapılamadı' };
    }
    return { message: 'Park Girişi Yapıldı ! 🎉' };
  });
