import prisma from '../prisma';

export const getInPark = async () => {
  try {
    const entryWithoutExit = await prisma.entry.findMany({
      where: {
        exit: null,
      },
      include: {
        customer: true,
        customs: true,
        invoice: true,
      },
    });
    if (!entryWithoutExit?.length) {
      return { message: 'Parkta Araç Yoktur. Araç Girişi Yapabilirsiniz' };
    }
    return entryWithoutExit;
  } catch (err) {
    console.log(err);
    throw new Error('Failed to fetch notes!');
  }
};

export type ParkEntryType = Awaited<ReturnType<typeof getInPark>>;
