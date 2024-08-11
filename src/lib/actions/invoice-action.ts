'use server';

import { redirect } from 'next/navigation';
import prisma from '../prisma';
import { CreateInvoiceSchema } from '../schemas/invoice-schemas';

type PrevState = {
  entryId: string;
  userId: string;
  error: string;
};

export async function updateInvoice(prevSate: PrevState, formData: FormData) {
  const { entryId, userId, error } = prevSate;
  const validatedFields = CreateInvoiceSchema.safeParse({
    amount: Number(formData.get('amount')),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      error: 'Araç çıkışı yapılamadı. Veri tütü hatası',
      entryId,
      userId,
    };
  }

  const amount = formData.get('amount') as string;
  const status = formData.get('status') as string;

  try {
    await prisma.invoice.update({
      where: { entryId },
      data: { userId, amount: Number(amount), status },
    });
  } catch (error) {
    console.log(error);
    return { error: 'Veri tabanına yazılırken hata oluştu.', entryId, userId };
  }
  redirect('/entry');
}
