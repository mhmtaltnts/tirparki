import prisma from '../prisma';
export const getOutOfPark = async () => {
  try {
    const entryWithexit = await prisma.entry.findMany({
      where: {
        exit: {
          isNot: null,
        },
      },
      select: {
        id: true,
        trailer: true,
        truck: true,
        createdAt: true,
        customer: {
          select: {
            name: true,
          },
        },
        exit: {
          select: {
            truck: true,
            createdAt: true,
          },
        },
        customs: {
          select: {
            desc: true,
          },
        },
        invoice: {
          select: {
            status: true,
          },
        },
      },
    });

    if (entryWithexit?.length === 0) {
      return { message: 'Parktan çıkışı yapılan araç yoktur. ' };
    }

    return entryWithexit;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch notes!');
  }
};

type entryWithexit = Awaited<ReturnType<typeof getOutOfPark>>;

export type departedT = Exclude<entryWithexit, { message: string }>;
