"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSafeActionClient } from "next-safe-action";
import { flattenValidationErrors } from "next-safe-action";
import { Status } from "@prisma/client";

import {
  CreateEntrySchema,
  UpdateEntrySchema,
  DeleteEntrySchema,
} from "@/lib/schemas/entry-schemas";
import prisma from "@/lib/prisma";

const BASE_URL = "http://localhost:3000";

const actionClient = createSafeActionClient({
  handleServerError(e) {
    return "Oh no, something went wrong!";
  },
});

export const createEntry = actionClient
  .schema(CreateEntrySchema, {
    handleValidationErrorsShape: (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(
    async ({ parsedInput: { userId, trailer, truck, customerId, cargo } }) => {
      try {
        const entryCreated = await prisma.entry.create({
          data: {
            trailer,
            truck,
            customerId: customerId || null,
            cargo,
            recorderId: userId,
          },
        });

        revalidatePath("/dashboard/entry");
        redirect("/dashboard/entry");
      } catch (error) {
        console.error(error);

        throw error;
        //return { error: 'Çıkış yapılamadı' };
      }
    },
  );

export const updateEntry = actionClient
  .schema(UpdateEntrySchema, {
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
        desc,
        amount,
        status,
      },
    }) => {
      try {
        const entryToUpdate = await prisma.entry.update({
          where: { id },
          data: {
            trailer,
            truck,
            customerId: customerId || null,
            cargo,
            recorderId: userId,
            customs: {
              update: {
                where: { entryId: id },
                data: {
                  desc,
                  registrarId: userId,
                },
              },
            },
            invoice: {
              update: {
                where: { entryId: id },
                data: {
                  amount,
                  status: status as Status,
                  registrarId: userId,
                },
              },
            },
          },
        });

        revalidatePath("entry");
      } catch (error) {
        console.error(error);

        throw error;
        //return { error: 'Çıkış yapılamadı' };
      }
      redirect("/entry");
    },
  );

export const deleteEntry = actionClient
  .schema(DeleteEntrySchema, {
    handleValidationErrorsShape: (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput: { id } }) => {
    try {
      const userToEdit = await prisma.entry.delete({
        where: { id },
      });

      revalidatePath("entry");
    } catch (error) {
      console.error(error);

      throw error;
      //return { error: 'Çıkış yapılamadı' };
    }
    return { message: "Park Girişi Yapıldı ! 🎉" };
  });
