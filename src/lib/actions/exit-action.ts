'use server';

import { redirect } from 'next/navigation';
import prisma from '../prisma';
import { CreateExitSchema } from '../schemas/exit-schemas';

type PrevState = {
  error: string;
  userId: string;
  entryId: string;
};

export async function createExit(prevSate: PrevState, formData: FormData) {
  const { userId, entryId } = prevSate;
  const validatedFields = CreateExitSchema.safeParse({
    truck: formData.get('truck'),
    
  });

  if (!validatedFields.success) {
    return {
      error: 'Araç çıkışı yapılamadı. Veri türü hatası', userId, entryId
    };
  }

  const truck = formData.get('truck') as string;
  

  try {
    await prisma.exit.create({
      data: { entryId, truck: truck.toUpperCase(), userId },
    });
  } catch (error) {
    console.log(error);
    return { error: 'Veri tabanına yazılırken hata oluştu.', userId, entryId };
  }
  redirect('/entry');
}
