"use server";

import { redirect } from "next/navigation";
import prisma from "../prisma";
import { CreateExitSchema } from "../schemas/exit-schemas";

type PrevState = {
  error: string;
  userId: string;
  entryId: string;
};

export async function createExit(prevSate: PrevState, formData: FormData) {
  const { userId, entryId } = prevSate;
  const values = Object.fromEntries(formData.entries());
  console.log(values);
  const validatedFields = CreateExitSchema.safeParse({
    truck: formData.get("truck"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  if (!validatedFields.success) {
    return {
      error: "Araç çıkışı yapılamadı. Veri türü hatası",
      userId,
      entryId,
    };
  }

  const { truck, amount, status } = validatedFields.data;

  try {
    await prisma.$transaction([
      prisma.exit.create({
        data: { entryId, truck: truck.toUpperCase(), recorderId: userId },
      }),

      prisma.invoice.create({
        data: { entryId, amount, status, registrarId: userId },
      }),
    ]);
  } catch (error) {
    console.log(error);
    return { error: "Veri tabanına yazılırken hata oluştu.", userId, entryId };
  }
  redirect("/dashboard/entry");
}
