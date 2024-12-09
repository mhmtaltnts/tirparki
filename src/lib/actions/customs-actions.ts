"use server";

import { redirect } from "next/navigation";
import prisma from "../prisma";
import { CreateCustomsSchema } from "../schemas/customs-schemas";
import { capitalizeFirstLetter } from "../utils";

type PrevState = {
  userId: string;
  entryId: string;
  error: string;
};

export async function createCustoms(prevSate: PrevState, formData: FormData) {
  const { userId, entryId } = prevSate;
  const validatedFields = CreateCustomsSchema.safeParse({
    desc: formData.get("desc"),
  });

  if (!validatedFields.success) {
    return {
      error: "Araç çıkışı yapılamadı. Veri türü hatası",
      userId,
      entryId,
    };
  }

  const desc = formData.get("desc") as string;

  try {
    await prisma.customs.create({
      data: { entryId, desc: capitalizeFirstLetter(desc), registrarId: userId },
    });
  } catch (error) {
    console.log(error);
    return { error: "Veri tabanına yazılırken hata oluştu.", userId, entryId };
  }
  redirect("/entry");
}
