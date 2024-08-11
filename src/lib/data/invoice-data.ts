import prisma from '../prisma';

export function getInvoice(entryId: string) {
  try {
    const invoice = prisma.invoice.findUnique({ where: { entryId } });
    return invoice;
  } catch (error) {
    return { error: 'Ödeme durumana ait kayıt bulunamadı.' };
  }
}
